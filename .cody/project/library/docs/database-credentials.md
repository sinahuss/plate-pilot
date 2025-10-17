# Database Credentials Storage

This document explains how to securely store and manage database credentials for the Plate Pilot project using Supabase.

## Security Best Practices

1. **Never commit `.env` files to git** - These are already in `.gitignore`
2. **Use `.env.example` as templates** - Commit these to show required variables
3. **Store actual credentials locally** - Only in your local `.env` files
4. **Use environment variables in production** - Configure on hosting platforms

## Your Supabase Project

**Project URL:** Get from your Supabase dashboard  
**Project Reference:** Found in your Supabase project URL  
**Anon Key:** Get from Project Settings → API in Supabase dashboard

## Supabase Connection Methods

Supabase provides two main connection methods:

### 1. Connection Pooler (Recommended for Applications)

Use **Supavisor** connection pooler for most application connections. It provides efficient connection management and is required for serverless environments.

**Port:** `6543` (transaction mode)  
**Format:** `postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

**Best for:** Spring Boot, FastAPI, Web applications, Serverless functions

### 2. Direct Connection (For Admin Tools)

Use direct Postgres connection for database admin tools and migrations.

**Port:** `5432` (session mode)  
**Format:** `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

**Best for:** psql, pgAdmin, database migrations, admin tasks

## Getting Your Connection String

1. Log into your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **Connect** button (or navigate to Settings → Database)
4. Under **Connection Pooler**, select **Transaction mode**
5. Copy the connection string
6. The password is the one you set when creating the project

**Your connection string will look like:**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

Replace `[PROJECT-REF]`, `[YOUR-PASSWORD]`, and `[REGION]` with your actual values.

## Creating Your .env Files

### JWT Secret Generation

Generate a secure JWT secret:
```bash
openssl rand -base64 32
```

Copy the output and use it in your `.env` file.

### Step 1: Spring Boot Backend

Create `backend/spring-boot/.env` with the following content:

```env
# Database Connection (Supabase Connection Pooler)
# Get your connection string from Supabase Dashboard → Settings → Database
DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
DATABASE_USERNAME=postgres.[YOUR-PROJECT-REF]
DATABASE_PASSWORD=[YOUR-PASSWORD]

# JWT Configuration
# Generate with: openssl rand -base64 32
JWT_SECRET=[YOUR-GENERATED-JWT-SECRET]
JWT_EXPIRATION=86400000

# Supabase API Keys
# Get these from Supabase Dashboard → Project Settings → API
SUPABASE_URL=[YOUR-SUPABASE-PROJECT-URL]
SUPABASE_ANON_KEY=[YOUR-SUPABASE-ANON-KEY]

# Other Services
FASTAPI_URL=http://localhost:8000
SERVER_PORT=8080
```

### Step 2: FastAPI Backend

Create `backend/fastapi/.env` with the following content (optional for v0.1.0):

```env
# Database Connection (Supabase Connection Pooler)
DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

### Step 3: Expo Frontend

Create `frontend/expo/.env` with the following content:

```env
# Backend API URLs (for local development)
API_BASE_URL=http://localhost:8080/api
FASTAPI_BASE_URL=http://localhost:8000

# Supabase Configuration (if using Supabase client directly)
# Get these from Supabase Dashboard → Project Settings → API
SUPABASE_URL=[YOUR-SUPABASE-PROJECT-URL]
SUPABASE_ANON_KEY=[YOUR-SUPABASE-ANON-KEY]
```

**Note:** For iOS Simulator or Android Emulator, you may need to adjust the API URLs:
- iOS Simulator: `http://localhost:8080/api` works
- Android Emulator: Use `http://10.0.2.2:8080/api`
- Physical device: Use your machine's IP address (e.g., `http://192.168.1.100:8080/api`)

## Verifying Your Setup

After creating your `.env` files, verify:

1. **Check files exist:**
   ```bash
   ls -la backend/spring-boot/.env
   ls -la backend/fastapi/.env
   ls -la frontend/expo/.env
   ```

2. **Verify they are gitignored:**
   ```bash
   git status
   # Should NOT show .env files in untracked files
   ```

3. **Test database connection** (see next section)

## Testing Database Connection (T007)

### Method 1: Using Supabase SQL Editor (Easiest)

1. Go to your Supabase Dashboard → SQL Editor
2. If you can see the SQL Editor and run queries, your database is working

Try running:
```sql
SELECT version();
```

### Method 2: Using psql Command Line

If you have `psql` installed, test the connection:

```bash
# Using connection pooler (recommended)
psql "postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres" -c "SELECT version();"

# Or using direct connection  
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" -c "SELECT version();"
```

Replace placeholders with your actual values.

**Expected output:** You should see PostgreSQL version information.

### Method 3: Using Supabase MCP (Cursor Integration)

Since you have Supabase MCP installed in Cursor, you can test by running any SQL query through the MCP tools. The connection is already configured.

## Production Deployment

When deploying to production:

1. **Do not use `.env` files** - Use platform environment variables instead
2. **Railway:** Set environment variables in project settings
3. **Vercel:** Set environment variables in project settings
4. **Supabase:** Use connection pooler URL in production for better performance

## Troubleshooting

### Issue: "Connection refused"
- Check your Supabase project is running
- Verify the host and port are correct
- Check your IP is allowed in Supabase (Settings → Database → Connection Pooling)

### Issue: "Authentication failed"
- Verify password is correct
- Check username format (may need `postgres.[REF]` instead of just `postgres`)
- Regenerate password in Supabase if needed

### Issue: ".env not loading"
- Verify file name is exactly `.env` (not `.env.txt`)
- Check file is in correct directory
- Restart your application after creating `.env`

## Security Reminders

- Never share your `.env` files
- Never commit them to git
- Never post them in issues or pull requests
- Rotate credentials if they are exposed
- Use different credentials for development and production

---

**Status:** Configured in v0.1.0-foundation
**Last Updated:** Phase 2, Task T006

