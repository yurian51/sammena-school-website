# SAMMENA Authentication & RBAC Matrix

| Capability | Super Admin | School Admin | Admissions | Editor | Teacher | Finance |
|---|---:|---:|---:|---:|---:|---:|
| Manage users/roles | ✓ | limited | - | - | - | - |
| Public content | ✓ | ✓ | - | ✓ | limited | - |
| Admissions | ✓ | ✓ | ✓ | - | limited | - |
| Student academic records | ✓ | ✓ | limited | - | ✓ | - |
| Attendance | ✓ | ✓ | limited | - | ✓ | - |
| Fees/payments | ✓ | ✓ | - | - | - | ✓ |
| Audit log | ✓ | ✓ | own actions | own actions | own actions | own actions |
| System settings | ✓ | limited | - | - | - | - |

## Authentication requirements

- Email/phone identifier according to the chosen identity provider.
- Strong password policy where passwords are managed directly.
- MFA readiness for privileged roles.
- Session revocation.
- Login rate limiting and suspicious-login monitoring.
- No authorization decisions trusted from client-side state.

## Authorization rule

Every private API operation must derive the effective role from a verified server-side identity and enforce object-level authorization.
