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
- **AI LLM API:** TBD for intelligent exercise recommendations

**Communication:**
- Frontend ↔ Spring Boot: REST API (JSON)
- Spring Boot ↔ FastAPI: REST API calls for AI services
- Async processing where appropriate for long-running operations

## Components

### Frontend Components (Expo/React Native)

- **Authentication Module**
  - Registration and login screens
  - Google OAuth
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
    - LLM-powered intelligent ranking
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
   - Set up Spring Boot project with Gradle
   - Set up Python FastAPI project
   - Configure development environment and tooling

2. **Database Setup**
   - Design and create PostgreSQL schema
   - Set up migrations (Flyway for Spring Boot)
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
   - UI for rating exercises (like/dislike)
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
    - Select cardio type dropdown (Running, Walking, Cycling, Other)
    - Input fields: Any combination of distance, time, steps, etc.
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
    - Deploy backend services (Vercel)
    - Deploy web app (Vercel)
    - Submit iOS app to TestFlight
    - Set up monitoring and error tracking
    - Create user documentation and onboarding guides

## Tools & Services

### Development Tools
- **IDEs:** VS Code
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
- **Supabase:** PostgreSQL database + authentication
- **LLM API:** TBD for exercise recommendations
- **Vercel:** Web app hosting
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

## Environment Setup

### Prerequisites
- **Node.js:** v18+ (for Expo)
- **Java JDK:** 17+ (for Spring Boot)
- **Python:** 3.10+ (for FastAPI)
- **PostgreSQL:** 14+ (local or remote via Supabase/Railway)
- **Git:** For version control
- **Expo CLI:** `npm install -g expo-cli`
- **IDE:** VS Code

### Development Workflow
- Frontend runs on Expo (mobile simulator or web)
- Spring Boot API runs on `localhost:8080`
- FastAPI service runs on `localhost:8000`
- PostgreSQL accessible via connection string
- Use Postman/Insomnia to test API endpoints during development

