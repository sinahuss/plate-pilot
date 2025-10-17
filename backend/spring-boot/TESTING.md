# API Testing Guide

This guide shows you how to test the Plate Pilot authentication API endpoints.

## Swagger/OpenAPI Documentation

The API is fully documented with **Swagger/OpenAPI**. Once the application is running, you can:

### Access Swagger UI:
```
http://localhost:8080/api/swagger-ui.html
```

### Features:
- 📖 **Interactive API documentation** - View all endpoints, request/response schemas
- 🧪 **Try it out** - Test endpoints directly from the browser
- 🔐 **JWT Authentication** - Click "Authorize" button to add your JWT token
- 📋 **Copy curl commands** - Export requests as curl commands
- 🎯 **Request/Response examples** - See exactly what to send and expect

### OpenAPI JSON Spec:
```
http://localhost:8080/api/v3/api-docs
```

## Prerequisites

1. **Start the Spring Boot Application:**
   ```bash
   cd backend/spring-boot
   export $(cat .env | xargs)
   ./gradlew bootRun
   ```

2. **Verify the app is running:**
   Wait for the log message: `Started PlatePilotApplication`

3. **Access Swagger UI** (Recommended):
   Open http://localhost:8080/api/swagger-ui.html in your browser

## Testing Endpoints

### 1. Health Check (Public Endpoint)

**Test that the API is running:**
```bash
curl http://localhost:8080/api/health
```

**Expected Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.123Z",
  "service": "plate-pilot-api"
}
```

---

### 2. User Registration

**Register a new user:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Save the token** from the response for use in protected endpoints!

**Test validation errors:**
```bash
# Missing required field
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "pass"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed",
    "details": {
      "firstName": "First name is required",
      "lastName": "Last name is required",
      "password": "Password must be at least 8 characters"
    },
    "timestamp": "2025-01-15T10:30:00.123Z"
  }
}
```

**Test duplicate email:**
```bash
# Try to register with the same email again
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "firstName": "Jane",
    "lastName": "Smith"
  }'
```

**Expected Response (409 Conflict):**
```json
{
  "error": {
    "code": "RESOURCE_ALREADY_EXISTS",
    "message": "Email already exists",
    "timestamp": "2025-01-15T10:30:00.123Z"
  }
}
```

---

### 3. User Login

**Login with registered credentials:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Test invalid credentials:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "WrongPassword"
  }'
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "timestamp": "2025-01-15T10:30:00.123Z"
  }
}
```

---

### 4. Get Current User (Protected Endpoint)

**Get current user details using JWT token:**
```bash
# Replace YOUR_JWT_TOKEN with the actual token from register/login response
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Test without token:**
```bash
curl http://localhost:8080/api/auth/me
```

**Expected Response (403 Forbidden):**
Spring Security will return a 403 Forbidden error.

**Test with invalid token:**
```bash
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer invalid.token.here"
```

**Expected Response (403 Forbidden):**
Spring Security will return a 403 Forbidden error.

---

## Complete Test Flow Example

Here's a complete test flow you can run:

```bash
# 1. Check API health
echo "=== Testing Health Endpoint ==="
curl -s http://localhost:8080/api/health | python3 -m json.tool

# 2. Register a new user
echo -e "\n=== Registering New User ==="
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "TestPass123",
    "firstName": "Test",
    "lastName": "User"
  }')
echo $REGISTER_RESPONSE | python3 -m json.tool

# Extract token from response
TOKEN=$(echo $REGISTER_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")
echo "Token: $TOKEN"

# 3. Login with the same user
echo -e "\n=== Logging In ==="
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "TestPass123"
  }')
echo $LOGIN_RESPONSE | python3 -m json.tool

# Update token
TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# 4. Get current user with token
echo -e "\n=== Getting Current User ==="
curl -s http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

# 5. Test invalid credentials
echo -e "\n=== Testing Invalid Credentials ==="
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "WrongPassword"
  }' | python3 -m json.tool

echo -e "\n=== All Tests Complete ==="
```

## Testing with Postman or Insomnia

### Import this collection:

1. **Health Check**
   - Method: GET
   - URL: `http://localhost:8080/api/health`

2. **Register**
   - Method: POST
   - URL: `http://localhost:8080/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "SecurePass123",
       "firstName": "First",
       "lastName": "Last"
     }
     ```

3. **Login**
   - Method: POST
   - URL: `http://localhost:8080/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "SecurePass123"
     }
     ```

4. **Get Current User**
   - Method: GET
   - URL: `http://localhost:8080/api/auth/me`
   - Headers: `Authorization: Bearer {token from login/register}`

## Troubleshooting

### Database Connection Issues

If you see errors like "Unable to obtain connection from database":

1. **Check your .env file has correct credentials:**
   ```bash
   cat .env
   ```

2. **Test database connectivity:**
   ```bash
   psql "$DATABASE_URL" -c "SELECT 1"
   ```

3. **Verify environment variables are loaded:**
   ```bash
   export $(cat .env | xargs)
   echo $DATABASE_URL
   ```

### CORS Issues (when testing from frontend)

If you get CORS errors from the Expo app:

1. Check `application.yml` has correct `cors.allowed-origins`
2. Verify the Expo dev server port matches (usually `http://localhost:19006`)
3. Check browser console for specific CORS error messages

### JWT Token Expired

JWT tokens expire after 24 hours (86400000 ms). If you get auth errors:

1. Login again to get a new token
2. Or adjust `jwt.expiration` in `application.yml` (for development only)

## Next Steps

After confirming the backend works:

1. **Test with the Expo app** (Phase 6-7)
2. **Test end-to-end flow** (Phase 9)
3. **Add unit tests** (v0.8.0-polish-deployment)

