-- Enforce tenant/school consistency at the database boundary.
-- Existing rows are checked first so this migration never silently masks
-- historical corruption by installing constraints over inconsistent data.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM enrollments e
    JOIN students s ON s.id = e.student_id
    WHERE e.school_id <> s.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment school does not match student school';
  END IF;

  IF EXISTS (
    SELECT 1 FROM enrollments e
    JOIN academic_years ay ON ay.id = e.academic_year_id
    WHERE e.school_id <> ay.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment school does not match academic year school';
  END IF;

  IF EXISTS (
    SELECT 1 FROM enrollments e
    JOIN classes c ON c.id = e.class_id
    WHERE e.school_id <> c.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment school does not match class school';
  END IF;

  IF EXISTS (
    SELECT 1 FROM attendance_records ar
    JOIN students s ON s.id = ar.student_id
    WHERE ar.school_id <> s.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: attendance school does not match student school';
  END IF;

  IF EXISTS (
    SELECT 1 FROM assessments a
    JOIN students s ON s.id = a.student_id
    WHERE a.school_id <> s.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: assessment school does not match student school';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM library_issues i
    JOIN library_books b ON b.id = i.book_id
    WHERE i.school_id <> b.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: library issue school does not match book school';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM library_issues i
    JOIN students s ON s.id = i.student_id
    WHERE i.school_id <> s.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: library issue school does not match student school';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM quality_evidence qe
    JOIN quality_indicators qi ON qi.id = qe.indicator_id
    JOIN quality_domains qd ON qd.id = qi.domain_id
    WHERE qe.school_id <> qd.school_id
  ) THEN
    RAISE EXCEPTION 'PORTAL_INTEGRITY: quality evidence school does not match indicator school';
  END IF;
END $$;

CREATE OR REPLACE FUNCTION enforce_portal_school_integrity()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  related_school_id uuid;
BEGIN
  IF TG_TABLE_NAME = 'enrollments' THEN
    SELECT school_id INTO related_school_id FROM students WHERE id = NEW.student_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment/student school mismatch';
    END IF;
    SELECT school_id INTO related_school_id FROM academic_years WHERE id = NEW.academic_year_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment/academic-year school mismatch';
    END IF;
    SELECT school_id INTO related_school_id FROM classes WHERE id = NEW.class_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: enrollment/class school mismatch';
    END IF;
  ELSIF TG_TABLE_NAME = 'attendance_records' THEN
    SELECT school_id INTO related_school_id FROM students WHERE id = NEW.student_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: attendance/student school mismatch';
    END IF;
  ELSIF TG_TABLE_NAME = 'assessments' THEN
    SELECT school_id INTO related_school_id FROM students WHERE id = NEW.student_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: assessment/student school mismatch';
    END IF;
  ELSIF TG_TABLE_NAME = 'library_issues' THEN
    SELECT school_id INTO related_school_id FROM library_books WHERE id = NEW.book_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: library issue/book school mismatch';
    END IF;
    SELECT school_id INTO related_school_id FROM students WHERE id = NEW.student_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: library issue/student school mismatch';
    END IF;
  ELSIF TG_TABLE_NAME = 'quality_evidence' THEN
    SELECT qd.school_id INTO related_school_id
      FROM quality_indicators qi JOIN quality_domains qd ON qd.id = qi.domain_id
     WHERE qi.id = NEW.indicator_id;
    IF related_school_id IS NULL OR NEW.school_id <> related_school_id THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: quality evidence/indicator school mismatch';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enrollments_school_integrity ON enrollments;
CREATE TRIGGER enrollments_school_integrity BEFORE INSERT OR UPDATE OF school_id, student_id, academic_year_id, class_id ON enrollments FOR EACH ROW EXECUTE FUNCTION enforce_portal_school_integrity();
DROP TRIGGER IF EXISTS attendance_school_integrity ON attendance_records;
CREATE TRIGGER attendance_school_integrity BEFORE INSERT OR UPDATE OF school_id, student_id ON attendance_records FOR EACH ROW EXECUTE FUNCTION enforce_portal_school_integrity();
DROP TRIGGER IF EXISTS assessments_school_integrity ON assessments;
CREATE TRIGGER assessments_school_integrity BEFORE INSERT OR UPDATE OF school_id, student_id ON assessments FOR EACH ROW EXECUTE FUNCTION enforce_portal_school_integrity();
DROP TRIGGER IF EXISTS library_issues_school_integrity ON library_issues;
CREATE TRIGGER library_issues_school_integrity BEFORE INSERT OR UPDATE OF school_id, book_id, student_id ON library_issues FOR EACH ROW EXECUTE FUNCTION enforce_portal_school_integrity();
DROP TRIGGER IF EXISTS quality_evidence_school_integrity ON quality_evidence;
CREATE TRIGGER quality_evidence_school_integrity BEFORE INSERT OR UPDATE OF school_id, indicator_id ON quality_evidence FOR EACH ROW EXECUTE FUNCTION enforce_portal_school_integrity();

CREATE OR REPLACE FUNCTION prevent_portal_parent_school_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_TABLE_NAME = 'students' AND NEW.school_id <> OLD.school_id THEN
    IF EXISTS (SELECT 1 FROM enrollments WHERE student_id = OLD.id)
       OR EXISTS (SELECT 1 FROM attendance_records WHERE student_id = OLD.id)
       OR EXISTS (SELECT 1 FROM assessments WHERE student_id = OLD.id)
       OR EXISTS (SELECT 1 FROM library_issues WHERE student_id = OLD.id) THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: cannot change school of referenced student';
    END IF;
  ELSIF TG_TABLE_NAME = 'academic_years' AND NEW.school_id <> OLD.school_id THEN
    IF EXISTS (SELECT 1 FROM enrollments WHERE academic_year_id = OLD.id) THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: cannot change school of referenced academic year';
    END IF;
  ELSIF TG_TABLE_NAME = 'classes' AND NEW.school_id <> OLD.school_id THEN
    IF EXISTS (SELECT 1 FROM enrollments WHERE class_id = OLD.id) THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: cannot change school of referenced class';
    END IF;
  ELSIF TG_TABLE_NAME = 'library_books' AND NEW.school_id <> OLD.school_id THEN
    IF EXISTS (SELECT 1 FROM library_issues WHERE book_id = OLD.id) THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: cannot change school of referenced book';
    END IF;
  ELSIF TG_TABLE_NAME = 'quality_domains' AND NEW.school_id <> OLD.school_id THEN
    IF EXISTS (SELECT 1 FROM quality_indicators qi JOIN quality_evidence qe ON qe.indicator_id = qi.id WHERE qi.domain_id = OLD.id) THEN
      RAISE EXCEPTION 'PORTAL_INTEGRITY: cannot change school of referenced quality domain';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS students_school_change_guard ON students;
CREATE TRIGGER students_school_change_guard BEFORE UPDATE OF school_id ON students FOR EACH ROW EXECUTE FUNCTION prevent_portal_parent_school_change();
DROP TRIGGER IF EXISTS academic_years_school_change_guard ON academic_years;
CREATE TRIGGER academic_years_school_change_guard BEFORE UPDATE OF school_id ON academic_years FOR EACH ROW EXECUTE FUNCTION prevent_portal_parent_school_change();
DROP TRIGGER IF EXISTS classes_school_change_guard ON classes;
CREATE TRIGGER classes_school_change_guard BEFORE UPDATE OF school_id ON classes FOR EACH ROW EXECUTE FUNCTION prevent_portal_parent_school_change();
DROP TRIGGER IF EXISTS library_books_school_change_guard ON library_books;
CREATE TRIGGER library_books_school_change_guard BEFORE UPDATE OF school_id ON library_books FOR EACH ROW EXECUTE FUNCTION prevent_portal_parent_school_change();
DROP TRIGGER IF EXISTS quality_domains_school_change_guard ON quality_domains;
CREATE TRIGGER quality_domains_school_change_guard BEFORE UPDATE OF school_id ON quality_domains FOR EACH ROW EXECUTE FUNCTION prevent_portal_parent_school_change();
