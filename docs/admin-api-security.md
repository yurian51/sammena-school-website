# SAMMENA Admin API Security

Protected operations must follow:

1. Resolve a verified session into `AuthContext`.
2. Require the exact permission for the operation.
3. Enforce school/object scope for private records.
4. Execute the domain service and its lifecycle rules.
5. Record an audit event for sensitive mutations.
6. Return a sanitized API response with a request ID.

No endpoint may trust a client-supplied role, school ID, status transition, or internal database identifier without server-side validation.

Production identity integration and automated security verification remain pending.
