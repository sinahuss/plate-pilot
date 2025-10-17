# Swagger/OpenAPI Documentation Guide

## Overview

The Plate Pilot API is fully documented using **Swagger/OpenAPI 3.0** via the SpringDoc library. This provides interactive API documentation, testing capabilities, and a single source of truth for the API contract.

## Accessing Swagger UI

### 1. Start the Application
```bash
cd backend/spring-boot
set -a; source .env; set +a
./gradlew bootRun
```

### 2. Open Swagger UI in Browser
```
http://localhost:8080/api/swagger-ui.html
```

## Features

### Interactive Documentation
- **View all endpoints** organized by tags (Authentication, Health)
- **See request/response schemas** with examples
- **View all possible HTTP status codes** for each endpoint
- **Understand authentication requirements** (JWT bearer token)

### Try It Out
1. **Expand an endpoint** (e.g., POST `/api/auth/register`)
2. **Click "Try it out"**
3. **Edit the request body** (JSON)
4. **Click "Execute"**
5. **See the response** (status code, body, headers)

### JWT Authentication Testing
1. **Register a user** via POST `/api/auth/register`
2. **Copy the JWT token** from the response
3. **Click the "Authorize" button** at the top right (🔓)
4. **Enter:** `Bearer <your-token-here>` (include the word "Bearer" with a space)
5. **Click "Authorize"**
6. Now you can test protected endpoints like GET `/api/auth/me`

### Export as curl
- Click **"Copy as cURL"** to export any request as a curl command
- Paste into terminal or Postman

## OpenAPI Specification

### JSON Format
```
http://localhost:8080/api/v3/api-docs
```

### Use Cases:
- **Generate client libraries** (TypeScript, Swift, Kotlin, etc.)
- **Import into Postman/Insomnia** for testing
- **Share with frontend team** for API contract
- **Generate SDK documentation**

## Implementation Details

### Dependencies Added
```gradle
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
```

### Configuration Files
- **`OpenApiConfig.java`**: Main OpenAPI configuration with JWT security scheme
- **`application.yml`**: SpringDoc settings (paths, UI configuration)
- **`SecurityConfig.java`**: Allows public access to Swagger endpoints

### Annotations Used

#### Controller-Level
```java
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
```

#### Method-Level
```java
@Operation(
    summary = "Register a new user",
    description = "Creates a new user account with email, password, and profile information."
)
@ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "User created successfully",
                 content = @Content(schema = @Schema(implementation = AuthResponse.class))),
    @ApiResponse(responseCode = "409", description = "Email already exists",
                 content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
})
```

#### Protected Endpoints
```java
@Operation(
    summary = "Get current user",
    security = @SecurityRequirement(name = "bearerAuth")
)
```

## Current Endpoints Documented

### Authentication (`/auth`)
- ✅ `POST /auth/register` - Register new user
- ✅ `POST /auth/login` - Login existing user
- ✅ `GET /auth/me` - Get current user (protected)

### Health (`/health`)
- ✅ `GET /health` - Health check

## Benefits

### For Development
- **Interactive testing** without Postman/curl
- **Quick validation** of request/response formats
- **JWT token management** built into UI

### For Team Collaboration
- **Single source of truth** for API contract
- **Frontend developers** can see exact request/response formats
- **Mobile developers** can understand authentication flow
- **Backend developers** can test endpoints during development

### For Production
- **API versioning** support (can document multiple versions)
- **Client SDK generation** from OpenAPI spec
- **API gateway integration** (can import OpenAPI spec)

## Troubleshooting

### Swagger UI Not Loading
- Check that the app is running on port 8080
- Verify `/api/swagger-ui.html` is accessible (not `/swagger-ui.html`)
- Check SecurityConfig allows Swagger endpoints

### 401 Unauthorized on Protected Endpoints
- Click "Authorize" button
- Enter token in format: `Bearer <token>` (with space)
- Make sure token hasn't expired (24 hours)

### Schema Not Showing
- Verify `@Schema` annotations on DTOs
- Check that classes are in the component scan path
- Restart the application

## Future Enhancements

- [ ] Add API versioning to OpenAPI config
- [ ] Generate TypeScript client from OpenAPI spec
- [ ] Add more example requests/responses
- [ ] Document rate limiting when implemented
- [ ] Add API changelog to Swagger UI

## Related Project Standards

This implementation follows the **API Contract Versioning** standard defined in:
```
.cody/project/library/rules/api-contract-versioning.md
```

All endpoints MUST be documented with:
- Endpoint description
- Request body schema
- Response schema
- Possible error responses
- Example requests and responses
- Authentication requirements

## Additional Resources

- [SpringDoc Documentation](https://springdoc.org/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)

