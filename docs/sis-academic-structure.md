# SAMMENA SIS Academic Structure

## Purpose

Define the canonical academic structure for Sammena Schools so the current Pre & Primary operation can expand to Secondary in 2028 without redesigning the core model.

## Hierarchy

School -> Campus -> Education Level -> Academic Year -> Term -> Class -> Stream -> Enrollment -> Student

### School
The tenant/root organization. All private operational records must be attributable to a school.

### Campus
A physical or operational location belonging to a school. The initial Sammena implementation may have one campus, but the model must not assume that forever.

### Education Level
Examples: Pre-School, Primary, Secondary. Education level is a reusable classification, not a hard-coded class name.

### Academic Year
A school year such as 2026 or 2028. It owns the active academic period and provides the boundary for enrollment and academic history.

### Term
A subdivision of an academic year. The implementation must support the school's actual term structure without assuming university-style semesters.

### Class
An academic grade/form within an education level, for example Standard 1 or Form 1.

### Stream
A teaching grouping within a class, for example A, B, or Blue. A class may have zero or more streams depending on enrollment and school policy.

### Enrollment
The authoritative relationship between a student and an academic placement for a specific academic year. Historical enrollments must remain immutable enough to preserve academic history.

### Student
The long-lived learner identity. A student's class/stream must not be stored as the only source of truth because placement changes over time.

## Secondary 2028 readiness

Secondary must be represented by the same education-level and enrollment model as Primary. Do not create a separate secondary-only student model.

Example:

Student -> Enrollment(2026, Primary, Standard 5, A)
Student -> Enrollment(2027, Primary, Standard 6, A)
Student -> Enrollment(2028, Secondary, Form 1, A)

## Tenancy rules

- School is the top-level authorization boundary.
- Campus belongs to a school.
- Academic records must resolve to a school through their ownership chain.
- Private APIs must derive school scope from trusted server-side identity.
- Client-provided school identifiers must never override the authenticated tenant.

## Promotion rules

Promotion is a new enrollment decision, not an overwrite of the previous enrollment.

The system should support:

- promoted
- repeated
- transferred
- withdrawn
- graduated
- pending placement

Exact business rules must be configured by school policy and should not be hard-coded into the student identity model.

## Status

This document defines the target planning model. It does not claim that the corresponding production database or SIS backend already exists.
