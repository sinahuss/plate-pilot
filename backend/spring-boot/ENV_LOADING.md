# Environment Variable Loading Guide

## Quick Reference

### ✅ Recommended Method
```bash
set -a; source .env; set +a
```

**Why this works:**
- `set -a` enables automatic export of all variables
- `source .env` reads and executes the .env file
- `set +a` disables automatic export
- Properly handles values with spaces, quotes, and special characters
- Works reliably across different shells (bash, zsh)

### ❌ Not Recommended
```bash
export $(cat .env | xargs)
```

**Why this can fail:**
- Breaks with values containing spaces (e.g., `JWT_SECRET="my secret key"`)
- Issues with special characters (e.g., `&`, `|`, `;`)
- Doesn't handle multi-line values
- Can fail with comments in .env files

## Usage Examples

### Starting the Application

**Option 1: Use the startup script (easiest)**
```bash
./start.sh
```

**Option 2: Manual with proper env loading**
```bash
set -a; source .env; set +a
./gradlew bootRun
```

**Option 3: IDE (IntelliJ IDEA / Eclipse)**
- Install "EnvFile" plugin (IntelliJ)
- Or manually add environment variables in Run Configuration
- IDE will automatically load from .env or configuration

### Verifying Environment Variables

```bash
# Load .env
set -a; source .env; set +a

# Check specific variable
echo $DATABASE_URL
echo $JWT_SECRET

# Check all loaded variables
printenv | grep DATABASE
printenv | grep JWT
```

## .env File Format

Your `.env` file should follow these guidelines:

**✅ Good formatting:**
```bash
# Database configuration
DATABASE_URL=jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
DATABASE_USERNAME=postgres.user
DATABASE_PASSWORD=my-secure-password

# JWT configuration
JWT_SECRET=dGhpc2lzYXZlcnlsb25nc2VjcmV0a2V5
JWT_EXPIRATION=86400000

# Server configuration
SERVER_PORT=8080
```

**✅ Values with spaces (use quotes):**
```bash
APP_NAME="Plate Pilot API"
DESCRIPTION="AI-powered workout tracker"
```

**❌ Avoid:**
```bash
# Don't use spaces around =
DATABASE_URL = jdbc:postgresql://...

# Don't use inline comments after values
JWT_SECRET=abc123  # This is my secret

# Don't use export keyword in .env
export DATABASE_URL=jdbc:postgresql://...
```

## Shell Compatibility

### Bash (Most Common)
```bash
set -a; source .env; set +a
```
Works perfectly ✅

### Zsh (macOS default)
```zsh
set -a; source .env; set +a
```
Works perfectly ✅

### Fish Shell
```fish
export (cat .env | xargs)
```
Use this alternative for Fish shell

### Windows PowerShell
```powershell
Get-Content .env | ForEach-Object {
    $name, $value = $_.split('=')
    Set-Item -Path "env:$name" -Value $value
}
```

### Windows CMD
Not recommended - use PowerShell or Git Bash instead

## Troubleshooting

### "source: .env: file not found"
**Solution:** Make sure you're in the `backend/spring-boot/` directory
```bash
cd backend/spring-boot
set -a; source .env; set +a
```

### Variables not loading
**Solution:** Check .env file format - no spaces around `=`
```bash
# Wrong
DATABASE_URL = jdbc:postgresql://...

# Correct
DATABASE_URL=jdbc:postgresql://...
```

### "permission denied: ./start.sh"
**Solution:** Make the script executable
```bash
chmod +x start.sh
```

### Values with special characters not working
**Solution:** Use quotes around the value in .env
```bash
JWT_SECRET="my!secret@key#with$special%chars"
```

## Alternative: Using a .envrc file (direnv)

If you use `direnv`, you can automatically load environment variables when entering the directory:

**Install direnv:**
```bash
# Ubuntu/Debian
sudo apt install direnv

# macOS
brew install direnv
```

**Create .envrc:**
```bash
set -a; source .env; set +a
```

**Allow direnv:**
```bash
direnv allow
```

Now environment variables load automatically when you `cd` into the directory!

## For Production

**⚠️ Never use .env files in production!**

Instead, use:
- **Environment variables** set by hosting platform (Railway, Heroku, AWS, etc.)
- **Secret management** (AWS Secrets Manager, HashiCorp Vault, etc.)
- **Container orchestration** (Kubernetes ConfigMaps and Secrets)

The `.env` file is only for local development!

## Additional Resources

- [Twelve-Factor App: Config](https://12factor.net/config)
- [dotenv documentation](https://github.com/motdotla/dotenv)
- [direnv documentation](https://direnv.net/)

