# Bulk student import

The admin API supports importing up to 500 student records per request.

## Endpoint

`POST /api/admin/students/import`

The caller must be signed in and have the `sis:students:write` permission. The endpoint always scopes inserts to the authenticated user's `schoolId`; a school ID supplied by the client is never accepted.

## Request

Send JSON with a `rows` array. Required fields are `admissionNumber`, `firstName`, `lastName`, and `gender`. Optional fields are `middleName` and `dateOfBirth`.

```json
{
  "dryRun": true,
  "rows": [
    {
      "admissionNumber": "SAM-001",
      "firstName": "Amina",
      "middleName": "",
      "lastName": "Example",
      "gender": "FEMALE",
      "dateOfBirth": "2012-04-16"
    }
  ]
}
```

Gender accepts `MALE`, `FEMALE`, `M`, or `F`. Dates must use `YYYY-MM-DD`. Do not invent missing dates or names; omit optional values when the official source does not contain them.

## Safety and duplicate handling

- Maximum batch size is 500 rows.
- Rows are validated before any write.
- Repeated admission numbers inside one upload are rejected as a batch.
- Existing `(school_id, admission_number)` records are skipped using the database unique constraint; they are never overwritten.
- Every inserted student gets a `STUDENT_IMPORTED` audit event.
- `dryRun: true` validates the payload without writing records.
- The endpoint creates student records only. It does not invent guardian details, class placement, academic-year enrollment, or student portal accounts. Those must be imported from verified source data through separately authorized workflows.

## Expected import result

The response reports `received`, `inserted`, and `skippedExisting` counts. The returned admission-number list is suitable for reconciliation against the approved source export.

Only use an official, school-authorized export. Avoid sending account passwords or unrelated student information with the import file.
