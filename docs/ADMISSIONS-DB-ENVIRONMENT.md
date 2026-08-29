# Admissions Database Environment Contract

Required production configuration will include a server-only database connection such as `DATABASE_URL`.

Rules:

- Never expose database credentials through `NEXT_PUBLIC_*` variables.
- Keep secrets outside source control.
- Use separate development/staging/production databases.
- Run migrations through a controlled deployment process.
- Back up production data before destructive migrations.
- Verify connection health without logging credentials.

This file defines the contract only; the repository currently does not contain a configured Prisma/PostgreSQL client.
