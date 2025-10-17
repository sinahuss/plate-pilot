# Security Practices

This document outlines security practices for the Plate Pilot project regarding secrets, credentials, and environment variables.

## What to Commit vs What to Keep Private

### NEVER Commit (❌)

1. **`.env` files** - Contain actual secrets and credentials
2. **JWT secrets** - Used to sign authentication tokens
3. **Database passwords** - Protect database access
4. **API keys with write permissions** - Can modify data
5. **Service role keys** - Have elevated permissions

These are in `.gitignore` and should NEVER be committed to version control.

### Safe to Commit (✅)

1. **`.env.example` files** - Templates with placeholders only
2. **Supabase Project URL** - Public-facing anyway
3. **Supabase Anon Key** - Designed for public frontend use (protected by RLS)
4. **Documentation with placeholders** - Helps team members set up

## Understanding Supabase Keys

### Anon Key (Public)

- **Purpose:** Used in frontend applications
- **Protection:** Row Level Security (RLS) policies limit what it can access
- **Safe to commit:** In `.env.example` files (though we use placeholders as best practice)
- **Not safe:** Actual production anon key in documentation

### Service Role Key (Private)

- **Purpose:** Backend admin operations, bypasses RLS
- **Protection:** Must be kept secret
- **Never commit:** Under any circumstances
- **Storage:** Only in `.env` files or secure secret managers

## JWT Secret

- **Purpose:** Signs authentication tokens
- **If exposed:** Attackers can forge authentication tokens
- **Required:** Generate a new one if ever exposed
- **Storage:** Only in `.env` files

## Our Approach

### In Git Repository

**`.env.example` files:**
```env
# Safe - uses placeholders
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=generate-a-secure-256-bit-secret-key-here
SUPABASE_ANON_KEY=[YOUR-SUPABASE-ANON-KEY]
```

**Documentation files:**
- Use placeholders: `[YOUR-PASSWORD]`, `[PROJECT-REF]`
- Provide instructions on where to find real values
- Never include actual secrets

### In Your Local Environment

**`.env` files:**
```env
# NOT in git - actual values
DATABASE_URL=postgresql://postgres.abc123:RealPassword@aws-0-us-west-1.pooler.supabase.com:6543/postgres
JWT_SECRET=VeOUZu3rIqi7l7hc9x13sRRkwhW9aAvdGefMqqPnZhg=
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## If Secrets Are Exposed

### JWT Secret Exposed

1. Generate a new JWT secret: `openssl rand -base64 32`
2. Update all `.env` files with new secret
3. Restart all services
4. All existing tokens will be invalidated (users need to re-login)

### Database Password Exposed

1. Go to Supabase Dashboard → Settings → Database
2. Reset database password
3. Update all `.env` files
4. Restart all services

### Service Role Key Exposed

1. Go to Supabase Dashboard → Project Settings → API
2. Contact Supabase support to rotate service role key
3. Update all `.env` files
4. Restart all services

## Git History Cleanup

If secrets were accidentally committed:

```bash
# For recent commits (not pushed)
git reset --soft HEAD~1  # Undo commit but keep changes
# Fix the files
git add .
git commit -m "fix: remove secrets"

# For pushed commits
# Contact your team and use git-filter-branch or BFG Repo-Cleaner
# Then force push: git push --force-with-lease
```

## Production Deployment

Never use `.env` files in production. Instead:

- **Railway:** Use environment variables in dashboard
- **Vercel:** Use environment variables in project settings  
- **AWS:** Use AWS Secrets Manager
- **Docker:** Use Docker secrets or environment variables

## Security Checklist

Before committing:
- [ ] Check no `.env` files are staged
- [ ] Verify no actual secrets in committed files
- [ ] Use placeholders in `.env.example` files
- [ ] Run `git status` to verify

After setting up environment:
- [ ] Create all required `.env` files
- [ ] Verify `.env` files are gitignored
- [ ] Test that secrets work
- [ ] Store backup of secrets securely (password manager)

## Reference

- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/going-into-prod#security)
- [12 Factor App - Config](https://12factor.net/config)

---

**Last Updated:** v0.1.0-foundation - Phase 2  
**Status:** Active security guidelines

