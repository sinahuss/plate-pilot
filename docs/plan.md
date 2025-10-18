# Product Implementation Plan
This document defines how the product will be built and when.

## Section Explanations
| Section                  | Overview |
|--------------------------|--------------------------|
| Overview                 | A brief recap of what we're building and the current state of the PRD. |
| Architecture             | High-level technical decisions and structure (e.g., frontend/backend split, frameworks, storage). |
| Components               | Major parts of the system and their roles. Think modular: what pieces are needed to make it work. |
| Data Model               | What data structures or models are needed. Keep it conceptual unless structure is critical. |
| Major Technical Steps    | High-level implementation tasks that guide development. Not detailed coding steps. |
| Tools & Services         | External tools, APIs, libraries, or platforms this app will depend on. |
| Risks & Unknowns         | Technical or project-related risks, open questions, or blockers that need attention. |
| Milestones    | Key implementation checkpoints or phases to show progress. |
| Environment Setup | Prerequisites or steps to get the app running in a local/dev environment. |

## Overview

Plate Pilot is an AI-powered weightlifting app that combines science-based mesocycle programming with intelligent exercise personalization. The app will help intermediate-to-advanced bodybuilders create and follow workout plans they actually enjoy, maximizing long-term adherence and muscle growth.

This plan outlines the technical implementation for v1.0, which includes user onboarding, science-based mesocycle generation, AI-powered exercise swapping based on preferences, workout logging, and weekly auto-adjustment. The system will be built as a cross-platform mobile application using Expo/React Native for the frontend, Spring Boot for the main backend API, Python FastAPI for AI/LLM services, and PostgreSQL for data persistence.

**Current Status:** Development is underway on v0.1.0-foundation. The monorepo structure (backend/spring-boot, backend/fastapi, frontend/expo) has been established, PostgreSQL database has been deployed, and the initial users table schema has been designed with Flyway migration V1__create_users_table.sql. Spring Boot API has been initialized with complete authentication system including JWT tokens, user registration/login endpoints, and security configuration. FastAPI service is set up with basic health check endpoint. Expo frontend project is initialized with TypeScript and basic folder structure. The project is ready to proceed with frontend authentication UI development and end-to-end testing.

## Architecture

**System Type:** Microservices architecture with mobile-first frontend

**Tech Stack:**

**Frontend:**
- **Framework:** Expo (React Native) for cross-platform development
- **Platform Support:** iOS native app + web application (mobile-optimized)
- **State Management:** React Context API or Redux
- **UI Components:** React Native Paper or NativeBase for consistent mobile UI
- **Deployment:** Vercel for web hosting, TestFlight/App Store for iOS

**Backend Services:**
- **Main API Service:** Spring Boot (Java/Kotlin)
  - REST API for all business logic
  - User authentication and authorization
  - Mesocycle generation and program logic
  - Workout logging and tracking
  - Weekly auto-adjustment algorithms
- **AI/LLM Service:** Python FastAPI microservice
  - Exercise recommendation engine
  - AI-powered exercise swapping (hybrid: rule-based + OpenAI LLM)
  - Exercise similarity scoring

**Data Layer:**
- **Database:** PostgreSQL (hosted on Supabase or Railway)
- **Authentication:** Supabase Auth or Spring Security with JWT
- **File Storage:** Supabase Storage (future: exercise videos/images)

**External APIs:**
- **OpenAI API:** GPT-4 or GPT-3.5 for intelligent exercise recommendations

**Communication:**
- Frontend ↔ Spring Boot: REST API (JSON)
- Spring Boot ↔ FastAPI: REST API calls for AI services
- Async processing where appropriate for long-running operations

## Components

### Frontend Components (Expo/React Native)

- **Authentication Module**
  - Registration and login screens
  - User profile management
  - Secure token storage

- **Onboarding Flow**
  - Multi-step wizard for user assessment
  - Experience level, training frequency, split preference, equipment selection
  - Exercise preference survey

- **Mesocycle Generator**
  - UI for mesocycle creation parameters
  - Muscle group focus/prioritization selector
  - Program preview and confirmation

- **Exercise Preference System**
  - Exercise rating interface (like/neutral/dislike)
  - AI swap recommendation display
  - Individual exercise replacement flow

- **Workout Logger**
  - Daily workout view with exercises
  - Set/rep/weight input interface
  - Progress tracking and completion markers
  - Fast, mobile-optimized UX

- **Cardio Logger**
  - Simple cardio session logging interface
  - Select cardio type (Running, Walking, Cycling, Rowing, Stair Climber, Other)
  - Input: Distance + Time OR Steps + Time
  - Mark cardio as complete
  - Fast, mobile-optimized UX

- **Program Dashboard**
  - Current mesocycle overview
  - Weekly progress view
  - Upcoming workouts

- **Consistency Calendar & Tracker**
  - Visual calendar component showing workout completion by day (weightlifting and cardio)
  - Streak counter (consecutive workout days)
  - Monthly and weekly consistency views
  - Visual indicators (weightlifting completed, cardio completed, rest days, missed days)
  - Motivational badges or milestones

### Backend Components (Spring Boot)

- **User Service**
  - User registration, authentication, authorization
  - Profile management
  - User preferences and settings

- **Program Service**
  - Mesocycle generation engine
  - Apply MEV/MAV/MRV volume landmarks
  - Training frequency optimization
  - Progressive overload strategy implementation

- **Workout Service**
  - Workout session management
  - Set/rep/weight logging
  - Workout completion tracking

- **Cardio Service**
  - Cardio session management
  - Log cardio type, distance/steps, and duration
  - Cardio completion tracking
  - Optional cardio suggestions based on user preferences

- **Auto-Adjustment Service**
  - Weekly performance analysis
  - Volume and intensity adjustment algorithms
  - MEV-MRV range validation
  - Progressive overload calculation

- **Exercise Database Service**
  - Exercise catalog management
  - Muscle group and movement pattern queries
  - Equipment filtering
  - Exercise metadata (difficulty, biomechanics)

- **Consistency Tracking Service**
  - Calculate workout streaks (consecutive days with weightlifting or cardio)
  - Generate calendar data for frontend
  - Identify rest days vs. missed days
  - Track activity type per day (weightlifting, cardio, both, or neither)
  - Calculate monthly/weekly adherence percentages
  - Badge/milestone achievement logic

### AI/LLM Components (FastAPI)

- **Exercise Recommender**
  - Hybrid recommendation engine:
    - Rule-based filtering (muscle group, movement pattern, equipment)
    - LLM-powered intelligent ranking (OpenAI API)
  - Exercise similarity scoring
  - Biomechanical equivalence validation

- **Swap Intelligence Module**
  - Analyzes user preferences and dislikes
  - Generates alternative exercise recommendations
  - Determines whether to swap individual exercises or regenerate full program

## Data Model

### Core Entities

**User**
- User ID, email, password (hashed)
- Name, profile information
- Experience level (beginner, intermediate, advanced)
- Training preferences (frequency, split type, equipment access)
- Created/updated timestamps

**Mesocycle**
- Mesocycle ID, user ID
- Duration (4-12 weeks)
- Start date, end date
- Muscle group priorities
- Status (active, completed, paused)
- Metadata (generation parameters)

**Exercise**
- Exercise ID
- Name, description
- Primary muscle groups (array)
- Secondary muscle groups (array)
- Movement pattern (horizontal push/pull, vertical push/pull, squat, hinge, etc.)
- Equipment type (barbell, dumbbell, cable, machine, bodyweight, smith)
- Difficulty level
- Biomechanical tags for substitution logic

**Workout**
- Workout ID, mesocycle ID, user ID
- Week number, day number
- Workout name (e.g., "Push Day A")
- Scheduled date
- Completion status
- Logged date (actual completion)

**Exercise Assignment**
- Assignment ID, workout ID, exercise ID
- Order/sequence in workout
- Target sets, target reps, target weight
- Notes, instructions

**Logged Set**
- Set ID, assignment ID
- Set number
- Reps performed, weight used
- Completion timestamp
- Optional: RPE/RIR (future v2.0)

**Exercise Preference**
- User ID, exercise ID
- Rating (like/neutral/dislike)
- Timestamp
- Reason/notes (optional)

**Cardio Session**
- Cardio session ID, user ID
- Date/time
- Cardio type (Running, Walking, Cycling, Rowing, Stair Climber, Other)
- Distance (optional, in miles or km)
- Steps (optional)
- Duration (in minutes)
- Notes (optional)
- Completion status

**Volume Landmark Reference Table**
- Muscle group
- MEV (Minimum Effective Volume)
- MAV (Maximum Adaptive Volume)
- MRV (Maximum Recoverable Volume)
- Recommended frequency (sessions per week)

**Streak Record**
- User ID
- Current streak (consecutive days with workouts)
- Longest streak (all-time best)
- Last workout date
- Total workouts completed

**Calendar Entry (Computed)**
- Date
- Activity type (weightlifting, cardio, both, rest day, missed)
- Workout ID (if weightlifting completed)
- Cardio session ID (if cardio completed)
- Is part of active streak

### Relationships
- User → Mesocycles (one-to-many)
- Mesocycle → Workouts (one-to-many)
- Workout → Exercise Assignments (one-to-many)
- Exercise Assignment → Logged Sets (one-to-many)
- User → Exercise Preferences (many-to-many through preferences)
- Exercise → Exercise Assignments (one-to-many)
- User → Cardio Sessions (one-to-many)
- User → Streak Record (one-to-one)
- User → Calendar Entries (computed from workouts and cardio sessions)

## Major Technical Steps

### Phase 1: Foundation & Setup
1. **Initialize Project Structure**
   - Set up Expo project with TypeScript
   - Set up Spring Boot project with Gradle/Maven
   - Set up Python FastAPI project
   - Configure development environment and tooling

2. **Database Setup**
   - Design and create PostgreSQL schema
   - Set up migrations (Flyway/Liquibase for Spring Boot)
   - Seed exercise database with initial 100-200 exercises
   - Create volume landmark reference data

3. **Authentication System**
   - Implement user registration and login (Spring Boot + Supabase Auth)
   - JWT token generation and validation
   - Frontend authentication flow
   - Secure API endpoints

### Phase 2: Core Program Generation

4. **Exercise Database Service**
   - Build exercise catalog API endpoints
   - Implement filtering by muscle group, equipment, movement pattern
   - Exercise search and query functionality

5. **Mesocycle Generation Engine**
   - Implement volume landmark logic (MEV/MAV/MRV)
   - Build algorithm for exercise selection based on user preferences
   - Generate weekly workout structure based on training split
   - Apply progressive overload strategy

6. **User Onboarding Flow**
   - Build multi-step onboarding UI
   - Capture user profile and preferences (including cardio preferences)
   - Ask: "Do you do cardio on rest days?" + frequency and preferred types
   - Save onboarding data to database
   - Navigate to mesocycle generation

### Phase 3: Exercise Personalization

7. **Exercise Preference System**
   - UI for rating exercises (like/neutral/dislike)
   - Store preference data in database
   - Build preference analysis logic

8. **AI Exercise Swap Module (FastAPI)**
   - Implement rule-based filtering service
   - Integrate OpenAI API for exercise recommendations
   - Build hybrid recommendation algorithm
   - Create swap decision logic (individual vs. full regeneration)

9. **Exercise Swap Integration**
   - Connect Spring Boot to FastAPI AI service
   - Implement swap workflow in frontend
   - Update mesocycle with swapped exercises

### Phase 4: Workout & Cardio Logging

10. **Workout Logging Interface**
    - Build daily workout view
    - Create set/rep/weight input UI (mobile-optimized)
    - Implement set completion tracking
    - Save logged data to database

11. **Cardio Logging Interface**
    - Build cardio logging screen
    - Select cardio type dropdown (Running, Walking, Cycling, Rowing, Stair Climber, Other)
    - Input fields: Distance + Time OR Steps + Time
    - Save cardio session to database
    - Mark cardio as complete

12. **Workout & Cardio Management**
    - Mark workouts and cardio sessions as complete
    - View workout and cardio history
    - Navigation between workouts and cardio logs

### Phase 5: Auto-Adjustment & Progressive Overload

13. **Performance Analysis Service**
    - Analyze logged workout data
    - Calculate weekly volume completion rate
    - Detect performance trends (strength gains, plateau, overtraining)

14. **Weekly Auto-Adjustment Algorithm**
    - Adjust next week's volume based on performance
    - Ensure volume stays within MEV-MRV range
    - Modify intensity (weight recommendations)
    - Update upcoming workouts with adjustments

### Phase 6: Consistency Tracking & Polish

15. **Consistency Calendar & Tracker**
    - Build visual calendar component (monthly/weekly views)
    - Implement streak calculation logic (includes both weightlifting and cardio)
    - Display current streak and longest streak
    - Show completed activities on calendar (weightlifting, cardio, or both)
    - Calculate and display adherence percentages

16. **Program Dashboard**
    - Build mesocycle overview screen
    - Display current week and progress
    - Show upcoming workouts and optional cardio suggestions
    - Integrate consistency streak display

17. **Testing & Quality Assurance**
    - Unit tests for critical business logic
    - Integration tests for API endpoints
    - End-to-end testing for user flows (including cardio logging)
    - Performance testing (mesocycle generation speed, API response times)

18. **Deployment & Launch Prep**
    - Deploy backend services (Railway/Vercel)
    - Deploy web app (Vercel)
    - Submit iOS app to TestFlight
    - Set up monitoring and error tracking
    - Create user documentation and onboarding guides

## Tools & Services

### Development Tools
- **IDEs:** IntelliJ IDEA (Spring Boot), VS Code (Expo, FastAPI)
- **Version Control:** Git + GitHub
- **API Testing:** Postman or Insomnia
- **Database Client:** pgAdmin or DBeaver

### Frontend
- **Expo CLI:** Cross-platform development framework
- **React Native Paper:** Material Design components
- **Axios:** HTTP client for API calls
- **React Navigation:** App navigation
- **Formik + Yup:** Form validation
- **React Native Calendars:** Calendar component for consistency tracking
- **date-fns or Moment.js:** Date manipulation for streak calculations

### Backend (Spring Boot)
- **Spring Boot Starter Web:** REST API development
- **Spring Security:** Authentication and authorization
- **Spring Data JPA:** Database ORM
- **Hibernate:** ORM implementation
- **Flyway:** Database migrations
- **Lombok:** Boilerplate reduction
- **Jackson:** JSON serialization

### Backend (FastAPI)
- **FastAPI:** Python web framework
- **Pydantic:** Data validation
- **OpenAI Python SDK:** LLM integration
- **Uvicorn:** ASGI server
- **Requests:** HTTP client

### External Services
- **Supabase:** PostgreSQL database + authentication (or Railway as alternative)
- **OpenAI API:** GPT-4/GPT-3.5 for exercise recommendations
- **Vercel:** Web app hosting
- **Railway:** Backend service hosting (alternative: Render, Fly.io)
- **Sentry:** Error tracking and monitoring (optional)

### Database
- **PostgreSQL 14+:** Primary database
- **Connection Pooling:** HikariCP (Spring Boot)

### Testing
- **JUnit 5:** Java unit testing
- **Mockito:** Java mocking framework
- **pytest:** Python testing
- **Jest:** JavaScript/React testing
- **React Native Testing Library:** Component testing

### DevOps
- **Docker:** Containerization (optional for local dev)
- **GitHub Actions:** CI/CD pipeline (optional)

## Risks & Unknowns

### Technical Risks

1. **Exercise Database Quality**
   - **Risk:** Building a comprehensive, accurate exercise database with proper muscle group mappings and biomechanical categorization is time-consuming
   - **Mitigation:** Start with 100-200 core exercises covering major movement patterns; expand iteratively based on user feedback

2. **OpenAI API Costs**
   - **Risk:** LLM API costs could become expensive at scale during beta testing
   - **Mitigation:** Implement caching for similar swap requests; consider rate limiting; explore open-source LLM alternatives (Llama 2, Mistral)

3. **Exercise Swap Quality**
   - **Risk:** AI-generated exercise substitutions may not always be biomechanically equivalent or appropriate
   - **Mitigation:** Use hybrid approach (rule-based + LLM); implement user feedback loop to report poor swaps; manual review of common swaps

4. **Auto-Adjustment Algorithm Complexity**
   - **Risk:** Individual recovery variance and training response differ greatly; auto-adjustment may not work well for all users
   - **Mitigation:** Start with conservative adjustment rules; collect user feedback; allow manual override of auto-adjustments

5. **Performance at Scale**
   - **Risk:** Mesocycle generation or AI swap requests may be slow with complex programs
   - **Mitigation:** Set performance targets (<10s for mesocycle, <3s for swap); implement caching; optimize database queries; async processing

6. **Mobile App Store Approval**
   - **Risk:** iOS App Store may have concerns about health/fitness advice liability
   - **Mitigation:** Include clear disclaimers; position as a tool, not medical advice; consult legal requirements early

### Product Risks

7. **Volume Landmark Data Accuracy**
   - **Risk:** Published research on MEV/MAV/MRV may not generalize to all users
   - **Mitigation:** Use conservative starting values; allow users to adjust based on experience; collect feedback during beta

8. **User Onboarding Complexity**
   - **Risk:** Onboarding flow may be too long or confusing for new users
   - **Mitigation:** Test with beta users; provide "help me" options; allow skipping optional questions; save progress

9. **Logging Adherence**
   - **Risk:** Users may not log workouts consistently, breaking auto-adjustment functionality
   - **Mitigation:** Make logging as fast as possible; send reminders; show value of logging through progress feedback

### Business & Timeline Risks

10. **Solo Developer Timeline**
    - **Risk:** 8-12 week timeline may be ambitious for a solo developer building v1.0
    - **Mitigation:** Focus ruthlessly on MVP features; cut scope if needed; use boilerplate/starter templates where possible

11. **Market Differentiation**
    - **Risk:** Competitors (RP, Hevy, Boostcamp) are established; users may not switch
    - **Mitigation:** Focus on unique value prop (AI exercise personalization); target users frustrated with rigid programs; beta testing with real users for feedback

12. **Consistency Calendar Motivation**
    - **Risk:** Users may find calendar/streak tracking demotivating if they miss days
    - **Mitigation:** Focus on positive reinforcement; allow marking rest days; don't punish missed days; cardio tracking helps users count "active days" beyond weightlifting; future v2.0 can add Apple Health step tracking for broader "activity" definition

13. **Cardio Feature Scope Creep**
    - **Risk:** Adding cardio logging could expand scope beyond hypertrophy focus; users may expect full cardio programming features
    - **Mitigation:** Keep v1.0 cardio simple (manual logging only, no programming intelligence); position as consistency tracking, not cardio programming; clearly communicate v1.0 scope in onboarding

14. **GDPR Compliance**
    - **Risk:** Handling EU user data requires GDPR compliance (user consent, data deletion, etc.)
    - **Mitigation:** Use Supabase for compliant data storage; implement data deletion endpoints; add privacy policy and terms

## Milestones

### Milestone 1: Project Setup & Authentication (Week 1-2)
- ✅ Monorepo structure created (backend/, frontend/)
- ✅ PostgreSQL database deployed
- ✅ Database schema for users table designed
- ✅ Flyway migration V1__create_users_table.sql created
- ✅ Git repository initialized with proper .gitignore
- ✅ Project README created with structure documentation
- ✅ Spring Boot API initialization completed
- ✅ FastAPI service initialization completed
- ✅ Expo project initialization completed
- ✅ Spring Boot authentication system implemented (JWT, registration, login)
- ✅ FastAPI health check endpoint working
- ⏳ User authentication working end-to-end (pending frontend UI)
- ⏳ Basic frontend navigation structure (pending)

### Milestone 2: Onboarding & Exercise Database (Week 2-3)
- ⏳ Exercise database seeded with 100+ exercises (pending)
- ⏳ Onboarding flow UI complete (including cardio preferences) (pending)
- ⏳ User preferences saved to database (pending)
- ⏳ Exercise database API endpoints functional (pending)

### Milestone 3: Mesocycle Generation (Week 3-5)
- ⏳ Volume landmark logic implemented (pending)
- ⏳ Mesocycle generation algorithm working (pending)
- ⏳ User can generate a personalized 8-week mesocycle (pending)
- ⏳ Workouts displayed in app (pending)
- ⏳ Program preview and confirmation flow (pending)

### Milestone 4: Exercise Preferences & AI Swapping (Week 5-7)
- ⏳ Exercise rating UI functional (pending)
- ⏳ FastAPI AI service integrated with OpenAI (pending)
- ⏳ Hybrid recommendation algorithm working (pending)
- ⏳ User can swap exercises and see AI recommendations (pending)
- ⏳ Mesocycle updates with swapped exercises (pending)

### Milestone 5: Workout & Cardio Logging (Week 7-9)
- ⏳ Workout logging interface complete (pending)
- ⏳ Set/rep/weight data saves to database (pending)
- ⏳ User can mark sets and workouts complete (pending)
- ⏳ Cardio logging interface complete (pending)
- ⏳ Cardio sessions save to database (type, distance/steps, duration) (pending)
- ⏳ Workout and cardio history displays logged data (pending)

### Milestone 6: Auto-Adjustment & Progressive Overload (Week 9-10)
- ⏳ Performance analysis service functional (pending)
- ⏳ Weekly auto-adjustment algorithm working (pending)
- ⏳ Volume adjustments stay within MEV-MRV range (pending)
- ⏳ User sees adjusted workouts for upcoming week (pending)

### Milestone 7: Consistency Tracking, Polish & Deployment (Week 11-12)
- ⏳ Consistency calendar and streak tracker complete (includes weightlifting and cardio) (pending)
- ⏳ Program dashboard complete with integrated streak display and cardio suggestions (pending)
- ⏳ All critical user flows tested end-to-end (including cardio logging) (pending)
- ⏳ Performance targets met (<10s mesocycle, <3s swap, <2s workout load) (pending)
- ⏳ Backend deployed to Railway/Vercel (pending)
- ⏳ Web app deployed to Vercel (pending)
- ⏳ iOS app submitted to TestFlight (pending)
- ⏳ Beta testing begins (pending)

### Milestone 8: Beta Launch (Week 12+)
- ⏳ 10-20 beta testers actively using the app (pending)
- ⏳ Feedback collected and prioritized (pending)
- ⏳ Critical bugs fixed (pending)
- ⏳ Ready for public launch planning (pending)

## Environment Setup

### Prerequisites
- **Node.js:** v18+ (for Expo)
- **Java JDK:** 17+ (for Spring Boot)
- **Python:** 3.10+ (for FastAPI)
- **PostgreSQL:** 14+ (local or remote via Supabase/Railway)
- **Git:** For version control
- **Expo CLI:** `npm install -g expo-cli`
- **IDE:** IntelliJ IDEA (Spring Boot), VS Code (Expo, FastAPI)

### Initial Setup Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd plate-pilot
   ```

2. **Frontend Setup (Expo)**
   ```bash
   cd frontend
   npm install
   # Create .env file with API endpoints
   expo start
   ```

3. **Backend Setup (Spring Boot)**
   ```bash
   cd backend/spring-boot
   # Configure application.yml with database credentials
   ./gradlew bootRun  # or mvn spring-boot:run
   ```

4. **AI Service Setup (FastAPI)**
   ```bash
   cd backend/fastapi
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   # Create .env file with OpenAI API key
   uvicorn main:app --reload
   ```

5. **Database Setup**
   - Create PostgreSQL database (local or Supabase/Railway)
   - Run migrations: Spring Boot will auto-apply Flyway migrations on startup
   - Seed exercise database using provided SQL script or seed service

6. **Environment Variables**
   - **Frontend (.env):**
     - `API_BASE_URL`: Spring Boot API endpoint
   - **Spring Boot (application.yml or .env):**
     - `DATABASE_URL`: PostgreSQL connection string
     - `JWT_SECRET`: Secret for JWT tokens
     - `FASTAPI_URL`: FastAPI service endpoint
   - **FastAPI (.env):**
     - `OPENAI_API_KEY`: OpenAI API key
     - `DATABASE_URL`: PostgreSQL connection (if needed for direct queries)

7. **Verify Setup**
   - Frontend: Open Expo app, verify login screen loads
   - Spring Boot: Hit health check endpoint `GET /api/health`
   - FastAPI: Hit docs endpoint `GET /docs`
   - Database: Verify connection and tables exist

### Development Workflow
- Frontend runs on Expo (mobile simulator or web)
- Spring Boot API runs on `localhost:8080`
- FastAPI service runs on `localhost:8000`
- PostgreSQL accessible via connection string
- Use Postman/Insomnia to test API endpoints during development

