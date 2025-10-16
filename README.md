# Plate Pilot

AI-powered weightlifting app that combines science-based mesocycle programming with intelligent exercise personalization to help bodybuilders create and follow workout plans they actually enjoy, maximizing long-term adherence and muscle growth.

## 🏗️ Tech Stack

### Frontend
- **Expo** (React Native) - Cross-platform mobile app (iOS + Web)
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Native Paper** - UI components

### Backend
- **Spring Boot** - Main REST API service (Java)
- **FastAPI** - AI/LLM microservice (Python)
- **PostgreSQL** - Database
- **Flyway** - Database migrations

### External Services
- **OpenAI API** - Exercise recommendations (added in v0.4.0)
- **Supabase/Railway** - PostgreSQL hosting

## 📁 Project Structure

```
plate-pilot/                    # Monorepo root
├── .cody/                      # Cody Framework (project management)
│   ├── config/                 # Framework configuration
│   └── project/                # Planning documents
│       ├── plan/               # PRD, plan, discovery
│       └── build/              # Version tasklists and design docs
├── backend/
│   ├── spring-boot/            # Main API service
│   │   ├── src/
│   │   ├── build.gradle
│   │   └── .env.example
│   └── fastapi/                # AI/LLM service
│       ├── app/
│       ├── requirements.txt
│       └── .env.example
├── frontend/
│   └── expo/                   # Mobile app
│       ├── src/
│       ├── package.json
│       └── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (for Expo)
- **Java JDK** 17+ (for Spring Boot)
- **Python** 3.10+ (for FastAPI)
- **PostgreSQL** 14+ (Supabase or Railway recommended)
- **Git**
- **Expo CLI:** `npm install -g expo-cli`

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/plate-pilot.git
cd plate-pilot
```

### 2. Database Setup

#### Option A: Supabase (Recommended)
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Settings → Database
4. Use this connection string in your backend `.env` files

#### Option B: Railway
1. Sign up at [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Use this connection string in your backend `.env` files

#### Option C: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb platepilot
```

### 3. Backend Setup (Spring Boot)

```bash
cd backend/spring-boot

# Copy environment example
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@host:port/platepilot
# JWT_SECRET=your-secure-secret-here

# Run the application
./gradlew bootRun

# API will be available at http://localhost:8080
```

**Verify it's working:**
```bash
curl http://localhost:8080/api/health
```

### 4. Backend Setup (FastAPI)

```bash
cd backend/fastapi

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment example
cp .env.example .env

# Edit .env if needed (OpenAI key will be added in v0.4.0)

# Run the application
uvicorn app.main:app --reload

# API will be available at http://localhost:8000
# API docs at http://localhost:8000/docs
```

**Verify it's working:**
```bash
curl http://localhost:8000/health
```

### 5. Frontend Setup (Expo)

```bash
cd frontend/expo

# Install dependencies
npm install

# Copy environment example
cp .env.example .env

# Edit .env with your API URLs
# API_BASE_URL=http://localhost:8080/api
# FASTAPI_BASE_URL=http://localhost:8000

# Start Expo
expo start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web browser
# Or scan QR code with Expo Go app on your phone
```

## 🔧 Development Workflow

1. **Start all services:**
   - Terminal 1: `cd backend/spring-boot && ./gradlew bootRun`
   - Terminal 2: `cd backend/fastapi && source venv/bin/activate && uvicorn app.main:app --reload`
   - Terminal 3: `cd frontend/expo && expo start`

2. **Test API endpoints:** Use Postman, Insomnia, or curl

3. **Check logs:** Monitor each terminal for errors

4. **Database changes:** Add new Flyway migration files in `backend/spring-boot/src/main/resources/db/migration/`

## 📚 Documentation

- **PRD:** `.cody/project/plan/prd.md`
- **Implementation Plan:** `.cody/project/plan/plan.md`
- **Feature Backlog:** `.cody/project/build/feature-backlog.md`
- **Current Version:** `.cody/project/build/v0.1.0-foundation/`

## 🧪 Testing

### Manual Testing (v0.1.0)
1. Register a new user via Expo app
2. Login with created credentials
3. Verify JWT token is stored
4. Verify authenticated home screen loads

### Running Tests (Coming in v0.8.0)
```bash
# Backend tests
cd backend/spring-boot && ./gradlew test

# Frontend tests
cd frontend/expo && npm test
```

## 🚢 Deployment

### Backend Deployment (Railway/Vercel)
- Deploy Spring Boot to Railway
- Deploy FastAPI to Railway or Vercel
- Configure environment variables in platform

### Frontend Deployment
- **Web:** Deploy to Vercel with `expo export:web`
- **iOS:** Build and submit to TestFlight/App Store
- **Android:** Build APK/AAB (coming in future versions)

## 🔐 Environment Variables

### Spring Boot (`.env`)
```
DATABASE_URL=postgresql://user:password@host:port/platepilot
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRATION=86400000
```

### FastAPI (`.env`)
```
DATABASE_URL=postgresql://user:password@host:port/platepilot
OPENAI_API_KEY=sk-... (added in v0.4.0)
```

### Expo (`.env`)
```
API_BASE_URL=http://localhost:8080/api
FASTAPI_BASE_URL=http://localhost:8000
```

## 📋 Current Progress

**Current Version:** v0.1.0-foundation  
**Status:** In Progress

See `.cody/project/build/v0.1.0-foundation/tasklist.md` for detailed task tracking.

## 🤝 Contributing

This is a solo project for now. Contributions will be considered after v1.0 launch.

## 📄 License

TBD

## 🙋 Support

For questions or issues, please create a GitHub issue.

---

Built with ❤️ using the Cody Framework for spec-driven development.

