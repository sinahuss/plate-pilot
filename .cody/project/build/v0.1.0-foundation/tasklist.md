# Version Tasklist – v0.1.0-foundation
This document outlines all the tasks to work on to deliver this particular version, grouped by phases.

| Status |      |
|--------|------|
| 🔴 | Not Started |
| 🟡 | In Progress |
| 🟢 | Completed |


## Phase 1: Project Structure & Monorepo Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T001 | Create Monorepo Structure | Create backend/ and frontend/ folders in root | None | 🟢 Completed | USER |
| T002 | Update .gitignore | Add ignores for node_modules, .env, build folders, IDE files | T001 | 🟢 Completed | AGENT |
| T003 | Create Root README | Document monorepo structure, setup instructions, tech stack | T001 | 🟢 Completed | AGENT |
| T004 | Initialize Git Repository | Ensure git is initialized, create initial commit | T001, T002 | 🟢 Completed | AGENT |


## Phase 2: Database Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T005 | Create PostgreSQL Database | Set up PostgreSQL on Supabase or Railway (free tier) | None | 🟢 Completed | USER |
| T006 | Document Database Credentials | Store database URL, username, password securely | T005 | 🟢 Completed | AGENT |
| T007 | Test Database Connection | Verify connection using psql or database client | T005 | 🟢 Completed | AGENT |
| T008 | Design Initial Schema | Create users table schema (see design.md) | T005 | 🟢 Completed | AGENT |
| T009 | Create Flyway Migration Files | Create V1__create_users_table.sql migration | T008 | 🟢 Completed | AGENT |


## Phase 3: Backend - Spring Boot API Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T010 | Initialize Spring Boot Project | Use Spring Initializr to create project with dependencies | T001 | 🟢 Completed | AGENT |
| T011 | Configure build.gradle | Add dependencies: Web, Security, JPA, PostgreSQL, Flyway, JWT, Lombok | T010 | 🟢 Completed | AGENT |
| T012 | Create Package Structure | Set up controller, service, repository, model, dto, security, config packages | T010 | 🟢 Completed | AGENT |
| T013 | Configure application.yml | Add database connection, JPA, Flyway, server port settings | T010, T006 | 🟢 Completed | AGENT |
| T014 | Create .env.example | Document required environment variables | T013 | 🟢 Completed | AGENT |
| T015 | Test Spring Boot Startup | Run ./gradlew bootRun and verify it starts successfully | T011, T013, T009 | 🟢 Completed | AGENT |
| T016 | Verify Flyway Migrations | Confirm users table is created in database | T015 | 🟢 Completed | AGENT |


## Phase 4: Backend - Spring Boot Authentication

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T017 | Create User Entity | Create User JPA entity with id, email, password, firstName, lastName | T016 | 🔴 Not Started | AGENT |
| T018 | Create UserRepository | Create JPA repository for User entity | T017 | 🔴 Not Started | AGENT |
| T019 | Create JWT Utility | Create JwtUtil class for token generation and validation | T013 | 🔴 Not Started | AGENT |
| T020 | Configure Spring Security | Set up SecurityConfig with JWT filter, disable CSRF, configure CORS | T019 | 🔴 Not Started | AGENT |
| T021 | Create RegisterRequest DTO | DTO for registration: email, password, firstName, lastName | T012 | 🔴 Not Started | AGENT |
| T022 | Create LoginRequest DTO | DTO for login: email, password | T012 | 🔴 Not Started | AGENT |
| T023 | Create AuthResponse DTO | DTO for auth response: id, email, firstName, lastName, token | T012 | 🔴 Not Started | AGENT |
| T024 | Create UserService | Implement registration and login logic with BCrypt password hashing | T018, T019 | 🔴 Not Started | AGENT |
| T025 | Create AuthController | Create /api/auth/register and /api/auth/login endpoints | T024, T021, T022, T023 | 🔴 Not Started | AGENT |
| T026 | Create Protected Endpoint | Create GET /api/auth/me endpoint to return current user | T020, T025 | 🔴 Not Started | AGENT |
| T027 | Create Health Check Endpoint | Create GET /api/health endpoint | T012 | 🔴 Not Started | AGENT |
| T028 | Add Input Validation | Add @Valid annotations and validation rules to DTOs | T021, T022 | 🔴 Not Started | AGENT |
| T029 | Add Exception Handling | Create global exception handler for auth errors | T025 | 🔴 Not Started | AGENT |


## Phase 5: Backend - FastAPI Service Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T030 | Create FastAPI Project Structure | Create backend/fastapi/ with app/ folder | T001 | 🔴 Not Started | AGENT |
| T031 | Create requirements.txt | Add fastapi, uvicorn, pydantic, python-dotenv | T030 | 🔴 Not Started | AGENT |
| T032 | Create main.py | Set up basic FastAPI app with CORS | T030 | 🔴 Not Started | AGENT |
| T033 | Create config.py | Load environment variables | T032 | 🔴 Not Started | AGENT |
| T034 | Create Health Check Endpoint | Create GET /health endpoint | T032 | 🔴 Not Started | AGENT |
| T035 | Create .env.example | Document required environment variables | T033 | 🔴 Not Started | AGENT |
| T036 | Test FastAPI Startup | Run uvicorn main:app --reload and verify it starts | T032, T034 | 🔴 Not Started | AGENT |


## Phase 6: Frontend - Expo Project Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T037 | Initialize Expo Project | Create Expo project with TypeScript template | T001 | 🔴 Not Started | AGENT |
| T038 | Install Dependencies | Install React Navigation, React Native Paper, Axios, AsyncStorage | T037 | 🔴 Not Started | AGENT |
| T039 | Create Folder Structure | Set up src/ with screens/, components/, navigation/, services/, context/, types/, utils/ | T037 | 🔴 Not Started | AGENT |
| T040 | Configure TypeScript | Update tsconfig.json with path aliases | T037 | 🔴 Not Started | AGENT |
| T041 | Create .env.example | Document API_BASE_URL and FASTAPI_BASE_URL | T039 | 🔴 Not Started | AGENT |
| T042 | Set Up Environment Config | Create config.ts to load environment variables | T041 | 🔴 Not Started | AGENT |
| T043 | Test Expo Startup | Run expo start and verify app loads | T037, T038 | 🔴 Not Started | AGENT |


## Phase 7: Frontend - Authentication UI

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T044 | Create Auth Context | Create AuthContext for authentication state management | T039 | 🔴 Not Started | AGENT |
| T045 | Create Auth Service | Create authService.ts with register, login, logout, getCurrentUser functions | T042 | 🔴 Not Started | AGENT |
| T046 | Create TypeScript Types | Create User, LoginRequest, RegisterRequest, AuthResponse types | T039 | 🔴 Not Started | AGENT |
| T047 | Create Login Screen | Build LoginScreen with email/password inputs and login button | T039, T046 | 🔴 Not Started | AGENT |
| T048 | Create Register Screen | Build RegisterScreen with email, password, firstName, lastName inputs | T039, T046 | 🔴 Not Started | AGENT |
| T049 | Create Home Screen | Build basic HomeScreen to show after successful login | T039 | 🔴 Not Started | AGENT |
| T050 | Implement Login Logic | Connect LoginScreen to authService and AuthContext | T044, T045, T047 | 🔴 Not Started | AGENT |
| T051 | Implement Register Logic | Connect RegisterScreen to authService and AuthContext | T044, T045, T048 | 🔴 Not Started | AGENT |
| T052 | Implement Token Storage | Store JWT token in AsyncStorage after login/register | T045, T050, T051 | 🔴 Not Started | AGENT |
| T053 | Implement Logout | Add logout functionality to clear token and auth state | T044, T045, T052 | 🔴 Not Started | AGENT |
| T054 | Add Form Validation | Add client-side validation for email format, password strength | T047, T048 | 🔴 Not Started | AGENT |
| T055 | Add Error Handling | Display error messages for failed login/register attempts | T050, T051 | 🔴 Not Started | AGENT |
| T056 | Add Loading States | Show loading indicators during API calls | T050, T051 | 🔴 Not Started | AGENT |


## Phase 8: Frontend - Navigation Setup

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T057 | Create Navigation Structure | Set up React Navigation with Stack Navigator | T038 | 🔴 Not Started | AGENT |
| T058 | Create Auth Stack | Create AuthStack with Login and Register screens | T057, T047, T048 | 🔴 Not Started | AGENT |
| T059 | Create App Stack | Create AppStack with Home screen (authenticated) | T057, T049 | 🔴 Not Started | AGENT |
| T060 | Implement Conditional Navigation | Show AuthStack or AppStack based on authentication state | T044, T058, T059 | 🔴 Not Started | AGENT |
| T061 | Add Navigation Between Auth Screens | Add "Sign Up" link on Login, "Sign In" link on Register | T058 | 🔴 Not Started | AGENT |
| T062 | Persist Auth State | Load token from AsyncStorage on app startup | T044, T052 | 🔴 Not Started | AGENT |


## Phase 9: Integration & End-to-End Testing

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T063 | Test Registration Flow | Register new user via Expo app, verify in database | T051, T025 | 🔴 Not Started | USER |
| T064 | Test Login Flow | Login with registered user, verify token returned | T050, T025 | 🔴 Not Started | USER |
| T065 | Test Protected Endpoint | Call /api/auth/me with valid token, verify user data returned | T026, T050 | 🔴 Not Started | USER |
| T066 | Test Invalid Credentials | Attempt login with wrong password, verify error handling | T050, T055 | 🔴 Not Started | USER |
| T067 | Test Token Persistence | Close and reopen app, verify user stays logged in | T062 | 🔴 Not Started | USER |
| T068 | Test Logout | Logout, verify token cleared and redirected to login | T053, T060 | 🔴 Not Started | USER |
| T069 | Test CORS | Verify Expo app can call Spring Boot API without CORS errors | T020, T045 | 🔴 Not Started | USER |
| T070 | Test FastAPI Health | Call FastAPI /health endpoint, verify response | T036 | 🔴 Not Started | USER |


## Phase 10: Documentation & Version Completion

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|-------------|----------|--------|
| T071 | Update Project README | Add setup instructions for all three services | T003, T063-T070 | 🔴 Not Started | AGENT |
| T072 | Document Environment Setup | Create detailed .env setup guide for each service | T014, T035, T041 | 🔴 Not Started | AGENT |
| T073 | Create Development Workflow Doc | Document how to run all services concurrently | T071 | 🔴 Not Started | AGENT |
| T074 | Update Feature Backlog | Mark v0.1.0 features as completed | T063-T070 | 🔴 Not Started | AGENT |
| T075 | Git Commit & Push | Commit all v0.1.0 code to repository | T063-T070 | 🔴 Not Started | USER |


## Summary

**Total Tasks:** 75  
**Not Started:** 59  
**In Progress:** 0  
**Completed:** 16  

**Estimated Timeline:** 1-2 weeks  
**Critical Path:** Phase 2 → Phase 3 → Phase 4 → Phase 6 → Phase 7 → Phase 9

