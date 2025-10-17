# API Contract & Versioning Rules

This document defines standards for API design, contracts, and versioning across all Plate Pilot services.

## API Endpoint Naming Conventions

### URL Structure

All API endpoints must follow this structure:

```
/api/{version}/{resource}[/{id}][/{action}]
```

**Examples:**
```
/api/v1/auth/register
/api/v1/auth/login
/api/v1/users/123
/api/v1/users/123/preferences
/api/v1/workouts
/api/v1/workouts/456/exercises
```

### Naming Rules

1. **Use lowercase** - All URLs in lowercase
2. **Use kebab-case** - For multi-word resources: `/exercise-templates` not `/exerciseTemplates`
3. **Use plural nouns** - For collections: `/users` not `/user`
4. **Be RESTful** - Use HTTP methods to indicate action:
   - `GET /api/v1/users` - List users
   - `POST /api/v1/users` - Create user
   - `GET /api/v1/users/123` - Get specific user
   - `PUT /api/v1/users/123` - Update user
   - `DELETE /api/v1/users/123` - Delete user

5. **Avoid verbs in URLs** - Except for non-CRUD operations:
   - ✅ `POST /api/v1/auth/login`
   - ✅ `POST /api/v1/auth/logout`
   - ✅ `POST /api/v1/workouts/123/complete`
   - ❌ `POST /api/v1/users/create`
   - ❌ `GET /api/v1/users/getAll`

## Request & Response Format Standards

### JSON Structure

All requests and responses must use JSON format with camelCase property names.

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### Standard Response Wrapper (Optional for Success)

For simple endpoints, return data directly. For complex endpoints with metadata, use:

```json
{
  "data": { },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 150
  }
}
```

### Date/Time Format

Use ISO 8601 format (UTC):
```json
{
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T14:45:30Z"
}
```

### Boolean Values

Use `true`/`false` (not `"true"`/`"false"` strings):
```json
{
  "isActive": true,
  "emailVerified": false
}
```

## HTTP Status Codes

Use appropriate HTTP status codes consistently:

### Success Codes
- **200 OK** - Successful GET, PUT, PATCH, or DELETE
- **201 Created** - Successful POST that creates a resource
- **204 No Content** - Successful DELETE with no response body

### Client Error Codes
- **400 Bad Request** - Validation errors, malformed request
- **401 Unauthorized** - Authentication required or failed
- **403 Forbidden** - Authenticated but not authorized
- **404 Not Found** - Resource doesn't exist
- **409 Conflict** - Resource conflict (e.g., duplicate email)
- **422 Unprocessable Entity** - Validation errors (alternative to 400)

### Server Error Codes
- **500 Internal Server Error** - Unexpected server error
- **503 Service Unavailable** - Service temporarily down

## API Versioning

### Version in URL Path

Use `/api/v1/` prefix for all endpoints:
```
/api/v1/auth/login
/api/v1/users
```

### Version Increment Rules

**Increment version when:**
- Breaking changes to request/response format
- Removing endpoints
- Changing authentication requirements
- Renaming fields

**No version increment needed for:**
- Adding new optional fields to requests
- Adding new fields to responses
- Adding new endpoints
- Bug fixes
- Performance improvements

### Supporting Multiple Versions

When introducing v2:
- Keep v1 running for at least 6 months
- Document migration guide from v1 to v2
- Add deprecation warnings to v1 responses (header: `X-API-Deprecated: true`)

## API Documentation Requirements

### OpenAPI/Swagger

All endpoints must be documented with:
- Endpoint description
- Request body schema (if applicable)
- Response schema
- Possible error responses
- Example requests and responses
- Authentication requirements

### Inline Documentation

For Spring Boot, use annotations:
```java
@Operation(summary = "Register a new user")
@ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "User created successfully"),
    @ApiResponse(responseCode = "409", description = "Email already exists")
})
@PostMapping("/register")
public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request)
```

For FastAPI (automatic):
```python
@router.post("/suggest-swap", response_model=SwapSuggestion)
async def suggest_exercise_swap(request: SwapRequest):
    """
    Suggest alternative exercises using AI.
    
    Args:
        request: Exercise swap request with current exercise details
        
    Returns:
        SwapSuggestion with recommended alternatives
    """
```

## Breaking Changes Process

When introducing breaking changes:

1. **Plan the change** - Document what's changing and why
2. **Increment version** - Move to v2, v3, etc.
3. **Update documentation** - Show differences from previous version
4. **Notify consumers** - If you have external users (future consideration)
5. **Maintain old version** - Keep v1 running during transition period
6. **Deprecate gracefully** - Give adequate notice before removing old version

## Cross-Service Communication

### Internal vs External APIs

**External APIs (Expo → Spring Boot):**
- Must be versioned (`/api/v1/...`)
- Strict backward compatibility
- Comprehensive documentation
- Strong validation

**Internal APIs (Spring Boot → FastAPI):**
- Can be more flexible
- Still use versioning for major changes
- Document expected contracts
- Handle failures gracefully

### Service-to-Service Authentication

For internal service calls (future consideration):
- Use service tokens or API keys
- Not the same as user JWT tokens
- Stored in environment variables
- Rotated periodically

## Headers

### Required Request Headers

```
Content-Type: application/json
Accept: application/json
```

### Authentication Header

```
Authorization: Bearer {jwt-token}
```

### Optional/Recommended Headers

```
X-Request-ID: {unique-request-id}  // For tracing requests
User-Agent: PlatePilot-Mobile/1.0.0  // Client identification
```

### Response Headers

```
Content-Type: application/json
X-Request-ID: {unique-request-id}  // Echo back for tracing
X-API-Version: v1  // Current API version
```

## API Contract Testing

Before deploying changes:
- Verify all existing tests pass
- Test with actual client (Expo app)
- Check that optional fields are truly optional
- Ensure error responses match documented format

---

**Last Updated:** v0.1.0-foundation  
**Applies To:** All services (Spring Boot, FastAPI)  
**Review:** Update when adding new API patterns or versioning

