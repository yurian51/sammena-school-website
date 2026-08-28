# SAMMENA Verification Checklist

## Static verification

- [ ] `pnpm typecheck`
- [ ] `pnpm build`

## API verification

- [ ] Public CMS read
- [ ] Public admissions submission
- [ ] Protected admissions lookup
- [ ] Protected admissions status transition
- [ ] Protected CMS publish

## Security verification

- [ ] Missing session -> 401
- [ ] Missing permission -> 403
- [ ] Wrong school scope -> 403
- [ ] Invalid status transition -> 409
- [ ] Sensitive mutation creates audit event

No item should be marked verified until it has actually been executed successfully in a configured environment.
