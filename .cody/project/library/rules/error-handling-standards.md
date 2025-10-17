# Error Handling Standards

This document defines how to handle, format, and communicate errors across all Plate Pilot services.

## Standardized Error Response Format

All services must return errors in this consistent JSON format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional context (optional)"
    },
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

### Field Descriptions

- **code** - Machine-readable error code (uppercase snake_case)
- **message** - User-friendly error message
- **details** - Optional object with additional context (validation errors, field-specific info)
- **timestamp** - ISO 8601 timestamp of when error occurred

## Error Codes

### Authentication Errors (AUTH_*)

| Code | HTTP Status | Message | When to Use |
|------|-------------|---------|-------------|
| `AUTH_INVALID_CREDENTIALS` | 401 | Invalid email or password | Login failed |
| `AUTH_TOKEN_MISSING` | 401 | Authentication token required | No token provided |
| `AUTH_TOKEN_INVALID` | 401 | Invalid or expired token | Token malformed or expired |
| `AUTH_TOKEN_EXPIRED` | 401 | Token has expired | Token valid but expired |
| `AUTH_UNAUTHORIZED` | 403 | You don't have permission to access this resource | Authenticated but forbidden |

### Validation Errors (VALIDATION_*)

| Code | HTTP Status | Message | When to Use |
|------|-------------|---------|-------------|
| `VALIDATION_FAILED` | 400 | Request validation failed | Generic validation error |
| `VALIDATION_EMAIL_INVALID` | 400 | Invalid email format | Email format wrong |
| `VALIDATION_PASSWORD_WEAK` | 400 | Password doesn't meet requirements | Password too weak |
| `VALIDATION_REQUIRED_FIELD` | 400 | Required field missing: {field} | Required field not provided |
| `VALIDATION_FIELD_TOO_LONG` | 400 | Field exceeds maximum length | String too long |

### Resource Errors (RESOURCE_*)

| Code | HTTP Status | Message | When to Use |
|------|-------------|---------|-------------|
| `RESOURCE_NOT_FOUND` | 404 | Resource not found | Entity doesn't exist |
| `RESOURCE_ALREADY_EXISTS` | 409 | Resource already exists | Duplicate (e.g., email) |
| `RESOURCE_CONFLICT` | 409 | Resource conflict | Update conflict |

### Server Errors (SERVER_*)

| Code | HTTP Status | Message | When to Use |
|------|-------------|---------|-------------|
| `SERVER_ERROR` | 500 | An unexpected error occurred | Generic server error |
| `SERVER_DATABASE_ERROR` | 500 | Database error occurred | Database connection/query failed |
| `SERVER_SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable | Service down |

### External Service Errors (EXTERNAL_*)

| Code | HTTP Status | Message | When to Use |
|------|-------------|---------|-------------|
| `EXTERNAL_SERVICE_ERROR` | 502 | External service error | Third-party API failed |
| `EXTERNAL_SERVICE_TIMEOUT` | 504 | External service timeout | Third-party API timeout |

## Error Response Examples

### Simple Error
```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

### Validation Error with Details
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    },
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

### Resource Not Found
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User not found",
    "details": {
      "resourceType": "User",
      "resourceId": "123e4567-e89b-12d3-a456-426614174000"
    },
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

## Implementation Guidelines

### Spring Boot (Java)

**Create Error Response DTO:**
```java
@Data
@AllArgsConstructor
public class ErrorResponse {
    private ErrorDetails error;
    
    @Data
    @AllArgsConstructor
    public static class ErrorDetails {
        private String code;
        private String message;
        private Map<String, String> details;
        private String timestamp;
    }
}
```

**Global Exception Handler:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(
        AuthenticationException ex
    ) {
        ErrorResponse.ErrorDetails errorDetails = new ErrorResponse.ErrorDetails(
            "AUTH_INVALID_CREDENTIALS",
            "Invalid email or password",
            null,
            Instant.now().toString()
        );
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse(errorDetails));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
        MethodArgumentNotValidException ex
    ) {
        Map<String, String> details = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            details.put(error.getField(), error.getDefaultMessage())
        );
        
        ErrorResponse.ErrorDetails errorDetails = new ErrorResponse.ErrorDetails(
            "VALIDATION_FAILED",
            "Request validation failed",
            details,
            Instant.now().toString()
        );
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(errorDetails));
    }
}
```

### FastAPI (Python)

**Create Error Models:**
```python
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class ErrorDetails(BaseModel):
    code: str
    message: str
    details: Optional[Dict[str, str]] = None
    timestamp: str

class ErrorResponse(BaseModel):
    error: ErrorDetails
```

**Exception Handlers:**
```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": "SERVER_ERROR",
                "message": exc.detail,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "SERVER_ERROR",
                "message": "An unexpected error occurred",
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }
    )
```

### Expo/React Native (TypeScript)

**Error Type Definition:**
```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
    timestamp: string;
  };
}
```

**Error Handling in Service:**
```typescript
import axios, { AxiosError } from 'axios';

async function login(email: string, password: string) {
  try {
    const response = await axios.post('/api/v1/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiError;
      
      // Handle specific error codes
      switch (apiError?.error?.code) {
        case 'AUTH_INVALID_CREDENTIALS':
          throw new Error('Invalid email or password');
        case 'VALIDATION_FAILED':
          const fieldErrors = apiError.error.details || {};
          throw new Error(Object.values(fieldErrors).join(', '));
        default:
          throw new Error(apiError?.error?.message || 'An error occurred');
      }
    }
    throw new Error('Network error occurred');
  }
}
```

## Logging Standards

### What to Log

**Always Log:**
- Error code
- Error message
- Stack trace (for 500 errors)
- Request ID (if available)
- Timestamp
- User ID (if authenticated)

**Never Log:**
- Passwords (even hashed)
- JWT tokens
- Credit card numbers
- Personal identification numbers

### Log Levels

Use appropriate log levels:

| Level | When to Use | Example |
|-------|-------------|---------|
| ERROR | Unexpected errors, exceptions | Database connection failed |
| WARN | Expected errors, validation failures | Invalid login attempt |
| INFO | Normal operations | User logged in successfully |
| DEBUG | Detailed debugging info | Request/response payloads |

### Log Format Examples

**Spring Boot:**
```java
log.error("Authentication failed for user: {}, code: {}", 
    email, "AUTH_INVALID_CREDENTIALS");
log.warn("Validation failed for request: {}, errors: {}", 
    requestId, validationErrors);
```

**FastAPI:**
```python
logger.error(f"Database error occurred: {str(e)}", 
    extra={"error_code": "SERVER_DATABASE_ERROR"})
logger.warning(f"Invalid request from user {user_id}: {details}")
```

## User-Facing vs Technical Messages

### User-Facing Messages
- Simple and clear
- No technical jargon
- Actionable when possible
- Professional tone

**Examples:**
- ✅ "Invalid email or password"
- ✅ "This email is already registered"
- ❌ "NullPointerException in UserService.authenticate()"
- ❌ "SQL constraint violation on users.email"

### Technical Messages (Logs)
- Include technical details
- Stack traces for debugging
- Request/response data
- Internal error codes

## Error Recovery Strategies

### Transient Errors (Retry)
- Network timeouts
- Temporary database connection issues
- Rate limiting (with backoff)

### Permanent Errors (Don't Retry)
- Validation errors
- Authentication failures
- Resource not found
- Unauthorized access

### Client-Side Handling

**Expo App Should:**
1. Display user-friendly error messages
2. Log errors for debugging
3. Retry transient errors with exponential backoff
4. Provide fallback UI for failed requests
5. Clear sensitive data on auth errors

## Testing Error Scenarios

Before deploying, test:
- [ ] Validation errors return correct format
- [ ] Authentication errors return 401
- [ ] Authorization errors return 403
- [ ] Not found errors return 404
- [ ] Server errors return 500
- [ ] Error details are helpful but not exposing internals
- [ ] Logs contain necessary debugging info

---

**Last Updated:** v0.1.0-foundation  
**Applies To:** All services (Spring Boot, FastAPI, Expo)  
**Review:** Update when adding new error types or patterns

