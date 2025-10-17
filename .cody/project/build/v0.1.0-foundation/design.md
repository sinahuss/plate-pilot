# Version Design Document : v0.1.0-foundation
Technical implementation and design guide for the upcoming version.

## 1. Features Summary
_Overview of features included in this version._

This version establishes the foundational infrastructure for Plate Pilot, including:

- **F001: Monorepo Structure** - Initialize monorepo with backend/ and frontend/ folders
- **F002: Expo Project Setup** - Initialize Expo/React Native project with TypeScript
- **F003: Spring Boot API Setup** - Initialize Spring Boot project with Gradle/Maven
- **F004: FastAPI Service Setup** - Initialize Python FastAPI project structure
- **F005: PostgreSQL Database** - Deploy PostgreSQL database (Supabase or Railway)
- **F006: Database Schema Design** - Design and create PostgreSQL schema with migrations
- **F007: User Authentication Backend** - Implement registration, login, JWT token generation (Spring Boot)
- **F008: User Authentication Frontend** - Build registration and login screens (Expo)
- **F009: Navigation Structure** - Set up React Navigation with basic app structure
- **F010: Environment Configuration** - Configure .env files and environment variables

**Goal:** By the end of this version, users should be able to register, log in, and see a basic authenticated home screen. All three services (Expo, Spring Boot, FastAPI) will be running locally and connected to a PostgreSQL database.

## 2. Technical Architecture Overview
_High-level technical structure that supports all features in this version._

### Monorepo Structure
```
plate-pilot/                          # Root project directory
├── .cody/                            # Cody Framework (project management)
│   ├── config/
│   └── project/
│       ├── plan/
│       └── build/
├── backend/
│   ├── spring-boot/                  # Main API service
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/platepilot/
│   │   │   │   │   ├── config/      # Spring configuration
│   │   │   │   │   ├── controller/  # REST controllers
│   │   │   │   │   ├── service/     # Business logic
│   │   │   │   │   ├── repository/  # Data access
│   │   │   │   │   ├── model/       # Entity models
│   │   │   │   │   ├── dto/         # Data transfer objects
│   │   │   │   │   └── security/    # Security configuration
│   │   │   │   └── resources/
│   │   │   │       ├── application.yml
│   │   │   │       └── db/migration/ # Flyway migrations
│   │   │   └── test/
│   │   ├── build.gradle (or pom.xml)
│   │   └── .env.example
│   └── fastapi/                      # AI/LLM service
│       ├── app/
│       │   ├── main.py              # FastAPI app entry
│       │   ├── config.py            # Configuration
│       │   ├── routes/              # API routes
│       │   ├── services/            # Business logic
│       │   └── models/              # Pydantic models
│       ├── requirements.txt
│       └── .env.example
├── frontend/
│   └── expo/                         # Mobile app
│       ├── src/
│       │   ├── screens/             # Screen components
│       │   │   ├── auth/            # Auth screens
│       │   │   └── home/            # Home screens
│       │   ├── components/          # Reusable components
│       │   ├── navigation/          # Navigation setup
│       │   ├── services/            # API services
│       │   ├── context/             # React Context
│       │   ├── types/               # TypeScript types
│       │   └── utils/               # Utility functions
│       ├── App.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── .env.example
├── .gitignore
└── README.md
```

### Technology Stack

**Frontend (Expo/React Native)**
- **Framework:** Expo SDK 50+ with React Native
- **Language:** TypeScript
- **Navigation:** React Navigation v6
- **UI Library:** React Native Paper (Material Design)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Storage:** AsyncStorage for JWT tokens

**Backend (Spring Boot)**
- **Framework:** Spring Boot 3.x
- **Language:** Java 17+
- **Build Tool:** Gradle (or Maven)
- **Key Dependencies:**
  - Spring Boot Starter Web (REST API)
  - Spring Boot Starter Security (Authentication)
  - Spring Boot Starter Data JPA (Database ORM)
  - Spring Boot Starter Validation
  - PostgreSQL Driver
  - Flyway (Database migrations)
  - JWT Library (io.jsonwebtoken:jjwt)
  - Lombok (Boilerplate reduction)
  - SpringDoc OpenAPI (Swagger/API Documentation)

**Backend (FastAPI)**
- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Key Dependencies:**
  - fastapi
  - uvicorn (ASGI server)
  - pydantic (Data validation)
  - python-dotenv (Environment variables)
  - (OpenAI integration will come in v0.4.0)

**Database**
- **Database:** PostgreSQL 14+
- **Hosting:** Supabase (free tier) or Railway (free tier)
- **Migration Tool:** Flyway (integrated with Spring Boot)

**Authentication Flow**
1. User registers via Expo app → POST `/api/auth/register` → Spring Boot
2. Spring Boot creates user, hashes password (BCrypt), saves to PostgreSQL
3. User logs in → POST `/api/auth/login` → Spring Boot validates credentials
4. Spring Boot generates JWT token, returns to app
5. Expo app stores JWT in AsyncStorage
6. All subsequent API calls include JWT in `Authorization: Bearer <token>` header
7. Spring Boot validates JWT on protected endpoints

## 3. Implementation Notes
_Shared technical considerations across all features in this version._

### Database Schema (Initial)

**users table:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

This initial schema supports user registration and login. Additional tables for user preferences, mesocycles, workouts, etc. will be added in subsequent versions.

### Environment Variables

**Frontend (.env)**
```
API_BASE_URL=http://localhost:8080/api
FASTAPI_BASE_URL=http://localhost:8000
```

**Spring Boot (application.yml or .env)**
```
DATABASE_URL=postgresql://localhost:5432/platepilot
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<password>
JWT_SECRET=<generate-secure-secret>
JWT_EXPIRATION=86400000  # 24 hours in milliseconds
```

**FastAPI (.env)**
```
DATABASE_URL=postgresql://localhost:5432/platepilot  # Optional for this version
```

### API Endpoints (Spring Boot)

**Authentication Endpoints:**
- `POST /api/auth/register` - Register new user
  - Request: `{ email, password, firstName, lastName }`
  - Response: `{ id, email, firstName, lastName, token }`
  
- `POST /api/auth/login` - Login existing user
  - Request: `{ email, password }`
  - Response: `{ id, email, firstName, lastName, token }`

- `GET /api/auth/me` - Get current user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ id, email, firstName, lastName }`

**Health Check:**
- `GET /api/health` - Check API status
  - Response: `{ status: "ok", timestamp: "..." }`

### API Documentation Standards

**Swagger/OpenAPI Integration:**
- All Spring Boot API endpoints are documented using SpringDoc OpenAPI annotations
- Interactive Swagger UI available at `/api/swagger-ui.html`
- OpenAPI JSON specification available at `/api/v3/api-docs`
- All endpoints include:
  - Operation summaries and descriptions
  - Request/response schemas
  - HTTP status codes and error responses
  - Authentication requirements (JWT bearer token)
- FastAPI automatically generates OpenAPI documentation at `/docs` (Swagger UI) and `/redoc` (ReDoc)

**Benefits:**
- **Interactive Testing:** Test endpoints directly from browser
- **Auto-Generated Client SDKs:** Can generate TypeScript/Swift/Kotlin clients from OpenAPI spec
- **Team Documentation:** Single source of truth for API contract
- **Frontend Development:** Frontend developers can reference Swagger UI for request/response formats

### Security Considerations

1. **Password Hashing:** Use BCrypt with strength 10-12
2. **JWT Secret:** Generate strong random secret (min 256 bits)
3. **HTTPS:** Use HTTPS in production (handled by deployment platform)
4. **CORS:** Configure CORS to allow Expo app origin
5. **Input Validation:** Validate all inputs (email format, password strength)
6. **Rate Limiting:** Consider basic rate limiting on auth endpoints (future enhancement)

### Development Workflow

1. Start PostgreSQL database (local or remote)
2. Start Spring Boot API: `./gradlew bootRun` (runs on `localhost:8080`)
3. Start FastAPI service: `uvicorn main:app --reload` (runs on `localhost:8000`)
4. Start Expo app: `expo start` (runs on Expo Go or simulator)
5. Use Postman/Insomnia to test API endpoints
6. Test authentication flow end-to-end in Expo app

## 4. Other Technical Considerations
_Shared any other technical information that might be relevant to building this version._

### Database Hosting Decision

**Option 1: Supabase (Recommended for MVP)**
- **Pros:** Free tier, includes PostgreSQL + Auth + Storage, easy setup, good documentation
- **Cons:** Auth is optional (we're building our own), vendor lock-in
- **Decision:** Use Supabase for PostgreSQL only, ignore Supabase Auth

**Option 2: Railway**
- **Pros:** Free tier, simple deployment, supports multiple services
- **Cons:** Free tier has usage limits
- **Decision:** Good alternative if Supabase doesn't work

**For v0.1.0:** Set up either Supabase or Railway PostgreSQL database and connect all services to it.

### FastAPI Role in This Version

FastAPI is being set up in this version but **won't have significant functionality** until v0.4.0 (exercise swapping). For now:
- Basic FastAPI app with health check endpoint
- Ready for future AI/LLM integration
- Can be started but not required for authentication flow

### Git Strategy

- **Main branch:** Protected, production-ready code
- **Develop branch:** Integration branch for features
- **Feature branches:** `feature/F001-monorepo-structure`, `feature/F007-auth-backend`, etc.
- Commit frequently, push to feature branches, merge to develop when complete

### Testing Strategy (Initial)

For v0.1.0, focus on **manual testing**:
- Test registration with valid/invalid inputs
- Test login with correct/incorrect credentials
- Test JWT token storage and retrieval
- Test protected endpoints with/without token

Unit tests will be added in v0.8.0-polish-deployment.

## 5. Open Questions
_Unresolved technical or product questions affecting this version._

### Q1: Should we use Gradle or Maven for Spring Boot?
**Decision Needed:** Choose build tool for Spring Boot project.
- **Gradle:** More modern, faster, better for monorepos
- **Maven:** More established, wider adoption
- **Recommendation:** Use Gradle unless you have strong Maven preference

### Q2: Should we use Supabase Auth or custom JWT authentication?
**Decision Needed:** Authentication approach.
- **Supabase Auth:** Built-in, handles tokens, reduces backend code
- **Custom JWT:** Full control, no vendor lock-in, learning opportunity
- **Recommendation:** Use custom JWT with Spring Security for full control and learning

### Q3: What password strength requirements?
**Decision Needed:** Password validation rules.
- **Recommendation:** Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
- Can be adjusted based on security needs

### Q4: Should we set up CI/CD in this version?
**Decision Needed:** GitHub Actions for automated testing/deployment.
- **Recommendation:** Skip for v0.1.0, add in v0.8.0 when we have tests to run

### Q5: Local PostgreSQL or remote from the start?
**Decision Needed:** Development database setup.
- **Local:** Faster, no internet dependency, free
- **Remote (Supabase/Railway):** Easier to share, consistent across team
- **Recommendation:** Start with Supabase/Railway free tier so all services can connect easily without local PostgreSQL setup

