# Database Migration Guidelines

This document defines standards for creating and managing database migrations using Flyway in the Plate Pilot project.

## Migration File Naming Convention

### Format

Flyway uses this naming pattern:
```
V{version}__{description}.sql
```

**Components:**
- `V` - Prefix indicating versioned migration (uppercase)
- `{version}` - Version number (see versioning rules below)
- `__` - Double underscore separator
- `{description}` - Snake_case description
- `.sql` - File extension

### Version Numbering

**Format:** `{major}.{minor}.{patch}`

**Examples:**
```
V1.0.0__create_users_table.sql
V1.0.1__add_users_email_index.sql
V1.1.0__create_workouts_table.sql
V1.1.1__add_workouts_user_id_fk.sql
V2.0.0__rename_users_username_to_email.sql
```

**Versioning Rules:**
1. **Major (X.0.0)** - Breaking changes, major schema restructuring
2. **Minor (0.X.0)** - New tables, columns (non-breaking additions)
3. **Patch (0.0.X)** - Indexes, constraints, minor adjustments

### Description Guidelines

Use clear, descriptive names:
- ✅ `create_users_table`
- ✅ `add_users_email_index`
- ✅ `add_workouts_completed_at_column`
- ✅ `create_exercise_templates_table`
- ❌ `update` (too vague)
- ❌ `fix` (what fix?)
- ❌ `changes` (what changes?)

## File Location

All migration files must be stored in:
```
backend/spring-boot/src/main/resources/db/migration/
```

Flyway automatically scans this directory on application startup.

## Migration File Structure

### Template

```sql
-- Migration: V{version}__{description}
-- Description: [Brief description of what this migration does]
-- Author: [Your name or AGENT]
-- Date: [YYYY-MM-DD]

-- [OPTIONAL] Add any setup needed
SET search_path TO public;

-- Main migration logic
CREATE TABLE example (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- [OPTIONAL] Add indexes
CREATE INDEX idx_example_name ON example(name);

-- [OPTIONAL] Add comments
COMMENT ON TABLE example IS 'Description of what this table stores';
COMMENT ON COLUMN example.name IS 'Description of this column';
```

### Example: Create Table Migration

```sql
-- Migration: V1.0.0__create_users_table
-- Description: Creates the users table for authentication
-- Author: AGENT
-- Date: 2025-01-15

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_users_email ON users(email);

-- Table and column comments
COMMENT ON TABLE users IS 'Stores user account information for authentication';
COMMENT ON COLUMN users.email IS 'User email address, must be unique';
COMMENT ON COLUMN users.password_hash IS 'BCrypt hashed password';
```

### Example: Add Column Migration

```sql
-- Migration: V1.2.0__add_users_email_verified_column
-- Description: Adds email verification status to users table
-- Author: AGENT
-- Date: 2025-01-20

ALTER TABLE users 
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE NOT NULL;

CREATE INDEX idx_users_email_verified ON users(email_verified);

COMMENT ON COLUMN users.email_verified IS 'Whether user has verified their email address';
```

### Example: Create Foreign Key Migration

```sql
-- Migration: V1.3.1__add_workouts_user_id_fk
-- Description: Adds foreign key constraint from workouts to users
-- Author: AGENT
-- Date: 2025-01-22

ALTER TABLE workouts
ADD CONSTRAINT fk_workouts_user_id 
FOREIGN KEY (user_id) 
REFERENCES users(id) 
ON DELETE CASCADE;

COMMENT ON CONSTRAINT fk_workouts_user_id ON workouts IS 
'Ensures workout belongs to valid user, cascade delete when user deleted';
```

## Rules for Writing Migrations

### DO

1. **Make migrations idempotent when possible**
   ```sql
   -- Use IF NOT EXISTS for tables
   CREATE TABLE IF NOT EXISTS users (...);
   
   -- Check before adding columns (PostgreSQL 9.6+)
   DO $$
   BEGIN
       IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='email_verified') THEN
           ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
       END IF;
   END $$;
   ```

2. **Use transactions implicitly** - Flyway wraps each migration in a transaction by default

3. **Provide default values** for new NOT NULL columns
   ```sql
   ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user' NOT NULL;
   ```

4. **Add comments** to tables and important columns
   ```sql
   COMMENT ON TABLE users IS 'User account information';
   COMMENT ON COLUMN users.email IS 'Unique user email address';
   ```

5. **Create indexes** for foreign keys and frequently queried columns
   ```sql
   CREATE INDEX idx_workouts_user_id ON workouts(user_id);
   CREATE INDEX idx_exercises_workout_id ON exercises(workout_id);
   ```

6. **Use UUID for primary keys** (project standard)
   ```sql
   id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   ```

7. **Include timestamps** on all tables
   ```sql
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   ```

### DON'T

1. **Don't modify existing migration files** - Once committed and run, they're immutable

2. **Don't delete migration files** - Even if you want to undo something, create a new migration

3. **Don't use database-specific syntax unnecessarily** - Stick to standard SQL when possible

4. **Don't hardcode data in schema migrations** - Use separate data migrations

5. **Don't break existing data** - Migrations should preserve data integrity

6. **Don't skip version numbers** - Maintain sequential versioning

## Data Migrations vs Schema Migrations

### Schema Migrations
Changes to database structure (tables, columns, indexes):
```sql
-- V1.0.0__create_users_table.sql
CREATE TABLE users (...);
```

### Data Migrations
Changes to data without schema changes:
```sql
-- V1.5.0__populate_default_exercise_templates.sql
INSERT INTO exercise_templates (name, muscle_group, equipment) VALUES
    ('Bench Press', 'Chest', 'Barbell'),
    ('Squat', 'Legs', 'Barbell'),
    ('Deadlift', 'Back', 'Barbell');
```

**Important:** Use separate migration files for data changes.

## Handling Migration Errors

### Before Deployment

If migration fails during development:
1. Fix the SQL in the migration file
2. Delete the entry from `flyway_schema_history` table:
   ```sql
   DELETE FROM flyway_schema_history WHERE version = '1.0.0';
   ```
3. Rerun the migration

### After Deployment

If migration fails in production:
1. **DO NOT** modify the failed migration file
2. Create a new migration to fix the issue:
   ```sql
   -- V1.0.1__fix_users_table_constraint.sql
   ALTER TABLE users DROP CONSTRAINT incorrect_constraint;
   ALTER TABLE users ADD CONSTRAINT correct_constraint CHECK (...);
   ```

## Rollback Strategy

### For Development

Create explicit rollback migrations:
```sql
-- V1.1.0__create_workouts_table.sql (forward)
CREATE TABLE workouts (...);

-- V1.1.1__rollback_create_workouts_table.sql (rollback if needed)
DROP TABLE IF EXISTS workouts;
```

### For Production

1. **Backup first** - Always backup before running migrations
2. **Test rollbacks** - Test rollback migrations in staging
3. **Document** - Note which migrations can be safely rolled back
4. **Consider data** - Rollback may lose data

## Testing Migrations

Before committing migrations:

### 1. Test Locally
```bash
# Run migrations
./gradlew bootRun

# Check flyway_schema_history table
psql -d platepilot -c "SELECT * FROM flyway_schema_history ORDER BY installed_on;"

# Verify tables created
psql -d platepilot -c "\dt"
```

### 2. Verify Data Integrity
- Check that existing data still accessible
- Verify foreign key constraints work
- Test queries that depend on new schema

### 3. Test Rollback (if applicable)
- Run rollback migration
- Verify database returns to previous state
- Re-run forward migration to confirm it works again

## Common Migration Patterns

### Adding a Column
```sql
ALTER TABLE users 
ADD COLUMN phone_number VARCHAR(20);
```

### Renaming a Column
```sql
ALTER TABLE users 
RENAME COLUMN username TO email;
```

### Dropping a Column
```sql
ALTER TABLE users 
DROP COLUMN middle_name;
```

### Adding a Constraint
```sql
ALTER TABLE users 
ADD CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

### Creating an Index
```sql
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

### Adding a Foreign Key
```sql
ALTER TABLE workouts
ADD CONSTRAINT fk_workouts_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

## Migration Checklist

Before committing a migration file:

- [ ] File name follows naming convention: `V{version}__{description}.sql`
- [ ] Version number is sequential and follows versioning rules
- [ ] Migration includes header comment with description, author, date
- [ ] SQL syntax is correct (no typos)
- [ ] Migration has been tested locally
- [ ] `flyway_schema_history` table shows successful migration
- [ ] Tables/columns created as expected
- [ ] Indexes created for foreign keys and frequently queried columns
- [ ] Comments added to tables and important columns
- [ ] No hardcoded sensitive data (IDs, passwords, etc.)
- [ ] Migration is committed to git with descriptive commit message

## Flyway Configuration

Flyway is configured in `application.yml`:

```yaml
spring:
  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration
    validate-on-migrate: true
```

**Settings:**
- `enabled: true` - Run migrations on startup
- `baseline-on-migrate: true` - Initialize flyway_schema_history if needed
- `locations` - Where to find migration files
- `validate-on-migrate: true` - Validate checksums before migrating

## Reference

- [Flyway Documentation](https://flywaydb.org/documentation/)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)

---

**Last Updated:** v0.1.0-foundation  
**Applies To:** All database migrations  
**Review:** Update when adding new patterns or best practices

