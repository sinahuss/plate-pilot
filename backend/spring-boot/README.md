# Plate Pilot API - Spring Boot Backend

Main backend API service for Plate Pilot, built with Spring Boot 3.2.0 and Java 17.

## Prerequisites

- **Java 17** or higher (JDK)
- **PostgreSQL** database (Supabase or Railway)
- **Gradle** (included via wrapper)

## Installation

### 1. Install Java 17

**Ubuntu/Debian:**
```bash
sudo apt install openjdk-17-jdk-headless
```

**macOS (using Homebrew):**
```bash
brew install openjdk@17
```

**Windows:**
Download and install from [Adoptium](https://adoptium.net/)

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your actual values:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string (must start with `jdbc:postgresql://`)
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `JWT_SECRET`: Secure 256-bit secret key for JWT tokens
- `JWT_EXPIRATION`: Token expiration time in milliseconds (default: 86400000 = 24 hours)
- `SERVER_PORT`: API server port (default: 8080)

### 3. Run the Application

**Using startup script (recommended):**
```bash
./start.sh
```

**Or manually load environment and run:**
```bash
# Load environment variables and run
set -a; source .env; set +a
./gradlew bootRun
```

**Note:** The `set -a; source .env; set +a` command is more reliable than `export $(cat .env | xargs)` as it properly handles values with spaces and special characters.

The API will start on `http://localhost:8080/api`

## Project Structure

```
src/
├── main/
│   ├── java/com/platepilot/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── model/           # JPA entity models
│   │   ├── repository/      # Data access repositories
│   │   ├── security/        # Security configuration
│   │   ├── service/         # Business logic services
│   │   └── PlatePilotApplication.java
│   └── resources/
│       ├── application.yml  # Application configuration
│       └── db/migration/    # Flyway database migrations
└── test/                    # Test files
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Authentication (Coming in Phase 4)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/me` - Get current user (protected)

## Database Migrations

Database migrations are managed by Flyway and located in `src/main/resources/db/migration/`.

Migrations run automatically on application startup.

## Development

### Build the project
```bash
./gradlew build
```

### Run tests
```bash
./gradlew test
```

### Clean build artifacts
```bash
./gradlew clean
```

## Technologies

- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Database ORM
- **Spring Security** - Authentication and authorization
- **PostgreSQL** - Database
- **Flyway** - Database migrations
- **JWT** - Token-based authentication
- **Lombok** - Boilerplate reduction
- **Gradle** - Build tool

## Troubleshooting

### "Command 'java' not found"
Install Java 17 JDK (see Installation section above)

### Database connection errors
- Verify DATABASE_URL in `.env` starts with `jdbc:postgresql://`
- Check database credentials are correct
- Ensure database is accessible (firewall, network, etc.)

### Port already in use
Change SERVER_PORT in `.env` to a different port (e.g., 8081)

## Next Steps

See the tasklist in `.cody/project/build/v0.1.0-foundation/tasklist.md` for upcoming development tasks.

