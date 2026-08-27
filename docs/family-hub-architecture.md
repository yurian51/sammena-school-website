# Sammena Family Hub Architecture

## Purpose

Provide one secure public gateway for parent, student and staff services while keeping authentication and school records inside the future SIS boundary.

## Public boundary

Website -> Family Hub gateway -> Authentication -> SIS services

The public website must never contain credentials, student records, fees data, grades or private documents.

## Future modules

- Parent profile
- Linked learners
- Attendance
- Academic results
- Fee balances and payment history
- Announcements
- Calendar
- Timetable
- Homework/resources
- Support enquiries
- Application tracking

## Security requirements

- Authenticated sessions
- Role-based access control
- Least privilege
- MFA readiness
- Secure session management
- Audit logging
- Consent/privacy controls
- File access authorization
- Rate limiting
- Backup and recovery strategy

## Integration principle

The website owns public content and navigation. The SIS owns student and operational records. The Family Hub is the controlled experience layer between them.
