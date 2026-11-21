# Alex Cyon — references

Static references page for https://cyonconsulting.com/aave/references/.

Seven recommendations supplied by Alex: six from screenshots on 19 November 2026, and Vanja’s from the user’s follow-up. Six are LinkedIn recommendations: five dated 18/19 March 2025, and Vanja’s confirmed by Alex as published on LinkedIn. Vanja’s publication date is 19 November 2026, supplied by Alex; her LinkedIn profile URL was also supplied by Alex. Omar’s recommendation was privately supplied, dated 19 March 2025, as confirmed by Alex. Multiple short quotations highlight technical expertise, collaboration and mentorship. Each quotation is an exact contiguous excerpt of the full text; highlighted words do not alter the quotation. Source spelling/grammar is retained, including Omar's. Roles and relationship descriptions come from the supplied contact sheets, not a fresh employer verification. Viktor is explicitly a personal reference/mentee, not a former professional colleague.

## Contact privacy

Only `contacts.enc.json` contains email/phone data, encrypted with AES-256-GCM. The key is derived from a separately shared password using PBKDF2-HMAC-SHA256, 600,000 iterations, a random 16-byte salt and random 12-byte IV. Authentication includes the context `cyon-aave-references-v1`. The password is not stored in the site or repository. Encryption is real client-side protection, not a hidden DOM field. Anyone who obtains the password can decrypt the file; this is not a server-side identity check or a rate-limited login.

The form decrypts locally and clears the password field. It does not send the password to a server or save it in cookies/localStorage/sessionStorage. Contacts appear only after successful authenticated decryption and can be locked again. Page departure clears displayed contacts. No third-party scripts, analytics or remote fonts are used. The seven portraits in `photos/` were explicitly supplied for publication. They display at a uniform 160px circular diameter; Omar’s existing circular portrait is cropped with CSS to remove the surrounding screenshot border. The original recommendation/contact screenshots and unencrypted contact records must never be committed. Keep the encryption password out of build commands, tracked test fixtures and documentation.

## Verification

- `node --test references.test.mjs`
- `node --check app.mjs`
- Preview on localhost; verify locked, wrong-password, unlocked and re-locked states.
- Before publication, scan the entire directory for plaintext email addresses, phone numbers and the actual shared password.

To update contacts, encrypt a complete new record with a new random salt and IV, using the same envelope format and context. Use a private/offline input mechanism, not plaintext tracked files. There is deliberately no password reset endpoint.

## Direct links

Cards are rendered from JSON. Initial fragment navigation waits until the cards and fonts exist, then scrolls to the requested ID. This fixes external links such as `/aave/references/#vanja` and `#omar`, which previously tried to resolve before their targets existed. The compact compensation rows link directly to the same IDs. Regression checks are in `../ask/navigation.test.mjs`.
