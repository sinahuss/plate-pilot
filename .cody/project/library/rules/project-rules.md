# Plate Pilot Project Rules

This document consolidates all coding standards, API conventions, database practices, and error handling for the Plate Pilot project.

## 1. Coding Style

### Documentation
- **NO EMOJIS** in documentation, README files, comments, commit messages, or technical specs
- Exception: User-facing UI text (only if explicitly requested)
- Use clear, professional text for headers and emphasis

### Code Conventions

**Java (Spring Boot):**
- camelCase for methods/variables, PascalCase for classes
- Use Lombok to reduce boilerplate
- Thin controllers, business logic in services
- DTOs for API request/response

**TypeScript (Expo/React Native):**
- Functional components with hooks
- PascalCase for components, camelCase for functions
- TypeScript types/interfaces for all props and parameters
- Prefer `const` over `let`

**Python (FastAPI):**
- Follow PEP 8 style guide
- Type hints for all function parameters and returns
- Pydantic models for request/response validation
- Thin routes, business logic in services

### Commit Messages
Format: `<type>: <description>` (no emojis)
Types: feat, fix, docs, style, refactor, test, chore

**After Each Task:** Commit with format: `"Complete [Task ID]: [Task Description]"`

## 2. API Standards

### URL Structure
```
/api/{version}/{resource}[/{id}][/{action}]
```

**Rules:**
- Lowercase, kebab-case for multi-word resources
- Plural nouns for collections (`/users` not `/user`)
- RESTful HTTP methods (GET, POST, PUT, DELETE)
- Avoid verbs except for non-CRUD operations (`/auth/login`, `/workouts/123/complete`)

### Request/Response Format
- JSON with camelCase properties
- ISO 8601 dates in UTC: `"2025-01-15T10:30:00Z"`
- Boolean as `true`/`false` (not strings)
- Optional wrapper for pagination: `{ "data": {}, "meta": { "page": 1, "pageSize": 20, "totalCount": 150 } }`

### HTTP Status Codes
**Success:** 200 (OK), 201 (Created), 204 (No Content)
**Client Error:** 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict)
**Server Error:** 500 (Internal Error), 503 (Service Unavailable)

### Versioning
- Use `/api/v1/` prefix
- Increment version for: breaking changes, removing endpoints, renaming fields
- No increment for: new optional fields, new endpoints, bug fixes
- Support old versions for 6+ months when introducing new version

### Headers
**Request:**
```
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Response:**
```
Content-Type: application/json
X-Request-ID: {unique-request-id}
X-API-Version: v1
```

## 3. Error Handling

### Standard Error Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { "field": "Additional context" },
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

### Error Codes

| Code | Status | Message | When |
|------|--------|---------|------|
| `AUTH_INVALID_CREDENTIALS` | 401 | Invalid email or password | Login failed |
| `AUTH_TOKEN_MISSING` | 401 | Authentication token required | No token |
| `AUTH_TOKEN_INVALID` | 401 | Invalid or expired token | Token malformed/expired |
| `AUTH_UNAUTHORIZED` | 403 | No permission for this resource | Authenticated but forbidden |
| `VALIDATION_FAILED` | 400 | Request validation failed | Generic validation |
| `VALIDATION_EMAIL_INVALID` | 400 | Invalid email format | Bad email |
| `VALIDATION_PASSWORD_WEAK` | 400 | Password doesn't meet requirements | Weak password |
| `VALIDATION_REQUIRED_FIELD` | 400 | Required field missing: {field} | Missing required field |
| `RESOURCE_NOT_FOUND` | 404 | Resource not found | Entity doesn't exist |
| `RESOURCE_ALREADY_EXISTS` | 409 | Resource already exists | Duplicate (e.g., email) |
| `RESOURCE_CONFLICT` | 409 | Resource conflict | Update conflict |
| `SERVER_ERROR` | 500 | Unexpected error occurred | Generic server error |
| `SERVER_DATABASE_ERROR` | 500 | Database error occurred | DB connection/query failed |
| `SERVER_SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable | Service down |
| `EXTERNAL_SERVICE_ERROR` | 502 | External service error | Third-party API failed |
| `EXTERNAL_SERVICE_TIMEOUT` | 504 | External service timeout | Third-party timeout |

### Logging
**Always Log:** Error code, message, stack trace (500s), request ID, timestamp, user ID (if auth'd)
**Never Log:** Passwords, JWT tokens, credit cards, PII

**Log Levels:**
- ERROR: Unexpected errors, exceptions
- WARN: Expected errors, validation failures
- INFO: Normal operations
- DEBUG: Detailed debugging info

## 4. Database Migrations (Flyway)

### File Naming
Format: `V{version}__{description}.sql`
Example: `V1.0.0__create_users_table.sql`

**Versioning:**
- Major (X.0.0): Breaking changes, major restructuring
- Minor (0.X.0): New tables, columns (non-breaking)
- Patch (0.0.X): Indexes, constraints, minor adjustments

### File Location
```
backend/spring-boot/src/main/resources/db/migration/
```

### Migration Template
```sql
-- Migration: V{version}__{description}
-- Description: [What this migration does]
-- Author: [Name or AGENT]
-- Date: [YYYY-MM-DD]

-- Migration logic here
CREATE TABLE example (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_example_name ON example(name);
COMMENT ON TABLE example IS 'Description';
```

### Rules
**DO:**
- Use `IF NOT EXISTS` when possible for idempotency
- Provide default values for new NOT NULL columns
- Add comments to tables and important columns
- Create indexes for foreign keys and frequently queried columns
- Use UUID for primary keys: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- Include timestamps: `created_at`, `updated_at`

**DON'T:**
- Modify existing migration files (create new one instead)
- Delete migration files
- Hardcode data in schema migrations
- Skip version numbers

### Error Handling
**Development:** Fix SQL, delete from `flyway_schema_history`, rerun
**Production:** Create new migration to fix issue

### Testing
Before committing:
- Test locally, check `flyway_schema_history` table
- Verify data integrity and constraints
- Test rollback (if applicable)

## 5. Common Patterns

### Adding Column
```sql
ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);
```

### Foreign Key
```sql
ALTER TABLE workouts
ADD CONSTRAINT fk_workouts_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

### Index
```sql
CREATE INDEX idx_users_email ON users(email);
```

---

**Version:** v0.1.0-foundation  
**Last Updated:** 2025-01-15  
**Applies To:** All services (Spring Boot, FastAPI, Expo)

