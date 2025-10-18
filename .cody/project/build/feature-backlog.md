# Feature Backlog

This document lists features and enhancements derived from the plan. It is a living document that will evolve throughout the project. It is grouped by version, with the Backlog tracking all features not added to a version yet. It is used to create versions to work on.

| Status |  | Priority |  |
|--------|-------------|---------|-------------|
| 🔴 | Not Started | High | High priority items |
| 🟡 | In Progress | Medium | Medium priority items |
| 🟢 | Completed | Low | Low priority items |


## v0.1.0-foundation - 🔴 Not Started
Project setup, authentication, and foundational infrastructure.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F001 | Monorepo Structure | Initialize monorepo with backend/ and frontend/ folders | High | 🔴 Not Started |
| F002 | Expo Project Setup | Initialize Expo/React Native project with TypeScript | High | 🔴 Not Started |
| F003 | Spring Boot API Setup | Initialize Spring Boot project with Gradle/Maven | High | 🔴 Not Started |
| F004 | FastAPI Service Setup | Initialize Python FastAPI project structure | High | 🔴 Not Started |
| F005 | PostgreSQL Database | Deploy PostgreSQL database (Supabase or Railway) | High | 🔴 Not Started |
| F006 | Database Schema Design | Design and create PostgreSQL schema with migrations | High | 🔴 Not Started |
| F007 | User Authentication Backend | Implement registration, login, JWT token generation (Spring Boot) | High | 🔴 Not Started |
| F008 | User Authentication Frontend | Build registration and login screens (Expo) | High | 🔴 Not Started |
| F009 | Navigation Structure | Set up React Navigation with basic app structure | High | 🔴 Not Started |
| F010 | Environment Configuration | Configure .env files and environment variables | Medium | 🔴 Not Started |

||F011 | Google Authentication | Add Google OAuth2 login/register option to auth screens | High | 🔴 Not Started |

## v0.2.0-onboarding - 🔴 Not Started
User onboarding flow and exercise database creation.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F011 | Exercise Database Schema | Create exercise table with muscle groups, movement patterns, equipment | High | 🔴 Not Started |
| F012 | Exercise Database Seeding | Seed database with 100-200 core exercises | High | 🔴 Not Started |
| F013 | Exercise API Endpoints | Build REST API for exercise catalog queries | High | 🔴 Not Started |
| F014 | Onboarding UI Flow | Build multi-step onboarding wizard | High | 🔴 Not Started |
| F015 | Experience Level Selection | Capture user experience level (beginner, intermediate, advanced) | High | 🔴 Not Started |
| F016 | Training Frequency Selection | Select training frequency (3-6 days per week) | High | 🔴 Not Started |
| F017 | Workout Split Selection | Choose workout split (PPL, Upper/Lower, Bro Split, etc.) | High | 🔴 Not Started |
| F018 | Exercise Preferences | Capture exercise preferences (compound, cable, machine, etc.) | High | 🔴 Not Started |
| F019 | Equipment Availability | Select available equipment | High | 🔴 Not Started |
| F020 | Cardio Preferences | Ask about cardio on rest days, frequency, and types | Medium | 🔴 Not Started |
| F021 | Save Onboarding Data | Store user preferences in database | High | 🔴 Not Started |

## v0.3.0-mesocycle-generation - 🔴 Not Started
Science-based mesocycle generation with volume landmarks.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F022 | Volume Landmark Data | Create volume landmark reference table (MEV/MAV/MRV per muscle group) | High | 🔴 Not Started |
| F023 | Mesocycle Data Model | Create mesocycle, workout, exercise assignment data models | High | 🔴 Not Started |
| F024 | Volume Landmark Logic | Implement MEV/MAV/MRV application logic | High | 🔴 Not Started |
| F025 | Exercise Selection Algorithm | Build exercise selection based on user preferences and split | High | 🔴 Not Started |
| F026 | Weekly Workout Structure | Generate weekly workout structure based on training split | High | 🔴 Not Started |
| F027 | Progressive Overload Strategy | Apply progressive overload across mesocycle weeks | High | 🔴 Not Started |
| F028 | Muscle Group Prioritization | Allow optional muscle group focus/prioritization | Medium | 🔴 Not Started |
| F029 | Mesocycle Generation API | REST API endpoint for mesocycle generation | High | 🔴 Not Started |
| F030 | Mesocycle Generation UI | UI for creating mesocycle with parameters | High | 🔴 Not Started |
| F031 | Program Preview | Display generated mesocycle for user review | High | 🔴 Not Started |
| F032 | Program Confirmation Flow | Allow user to confirm and activate mesocycle | High | 🔴 Not Started |

## v0.4.0-exercise-swapping - 🔴 Not Started
Exercise preference system with AI-powered swapping.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F033 | Exercise Rating UI | Build interface for rating exercises (like/neutral/dislike) | High | 🔴 Not Started |
| F034 | Exercise Preference Storage | Store exercise ratings in database | High | 🔴 Not Started |
| F035 | Rule-Based Filtering | Implement rule-based exercise filtering (muscle group, movement, equipment) | High | 🔴 Not Started |
| F036 | OpenAI Integration | Integrate OpenAI API for exercise recommendations | High | 🔴 Not Started |
| F037 | Hybrid Recommendation Algorithm | Build hybrid engine (rule-based + LLM ranking) | High | 🔴 Not Started |
| F038 | Exercise Similarity Scoring | Calculate biomechanical similarity for substitutions | Medium | 🔴 Not Started |
| F039 | Swap Decision Logic | Determine individual swap vs. full program regeneration | High | 🔴 Not Started |
| F040 | Exercise Swap API | REST API endpoints for exercise swapping | High | 🔴 Not Started |
| F041 | Swap Recommendation UI | Display AI-generated exercise alternatives | High | 🔴 Not Started |
| F042 | Update Mesocycle with Swap | Apply swapped exercises to active mesocycle | High | 🔴 Not Started |

## v0.5.0-workout-logging - 🔴 Not Started
Workout and cardio logging functionality.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F043 | Workout Logging Data Model | Create logged set data model | High | 🔴 Not Started |
| F044 | Daily Workout View | Build UI showing today's workout with exercises | High | 🔴 Not Started |
| F045 | Set/Rep/Weight Input | Mobile-optimized input for set logging | High | 🔴 Not Started |
| F046 | Set Completion Tracking | Mark individual sets as complete | High | 🔴 Not Started |
| F047 | Workout Completion | Mark entire workout as complete | High | 🔴 Not Started |
| F048 | Workout Logging API | REST API for saving logged workout data | High | 🔴 Not Started |
| F049 | Cardio Session Data Model | Create cardio session data model | High | 🔴 Not Started |
| F050 | Cardio Logging UI | Build cardio logging screen with type selection | High | 🔴 Not Started |
| F051 | Cardio Input Fields | Input for distance/steps and duration | High | 🔴 Not Started |
| F052 | Cardio Completion | Mark cardio session as complete | High | 🔴 Not Started |
| F053 | Cardio Logging API | REST API for saving cardio sessions | High | 🔴 Not Started |
| F054 | Workout History View | Display past logged workouts | Medium | 🔴 Not Started |
| F055 | Cardio History View | Display past cardio sessions | Medium | 🔴 Not Started |
| F056 | Navigation Between Workouts | Allow navigation through workout schedule | Medium | 🔴 Not Started |

## v0.6.0-auto-adjustment - 🔴 Not Started
Weekly auto-adjustment and progressive overload.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F057 | Performance Analysis Service | Analyze logged workout data weekly | High | 🔴 Not Started |
| F058 | Volume Completion Calculation | Calculate weekly volume completion rate | High | 🔴 Not Started |
| F059 | Trend Detection | Detect performance trends (strength gains, plateau, overtraining) | High | 🔴 Not Started |
| F060 | Volume Adjustment Algorithm | Adjust next week's volume based on performance | High | 🔴 Not Started |
| F061 | MEV-MRV Validation | Ensure volume stays within MEV-MRV range | High | 🔴 Not Started |
| F062 | Intensity Adjustment | Modify weight recommendations based on progress | High | 🔴 Not Started |
| F063 | Update Upcoming Workouts | Apply adjustments to next week's workouts | High | 🔴 Not Started |
| F064 | Auto-Adjustment API | REST API for triggering and viewing adjustments | High | 🔴 Not Started |
| F065 | Adjustment Notifications | Notify user of weekly adjustments | Medium | 🔴 Not Started |

## v0.7.0-consistency-tracking - 🔴 Not Started
Consistency calendar, streak tracking, and program dashboard.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F066 | Streak Data Model | Create streak record entity | High | 🔴 Not Started |
| F067 | Streak Calculation Logic | Calculate consecutive workout days (weightlifting + cardio) | High | 🔴 Not Started |
| F068 | Calendar Data Generation | Generate calendar entries from workouts and cardio | High | 🔴 Not Started |
| F069 | Activity Type Tracking | Track daily activity (weightlifting, cardio, both, rest, missed) | High | 🔴 Not Started |
| F070 | Adherence Percentage | Calculate monthly/weekly adherence metrics | Medium | 🔴 Not Started |
| F071 | Calendar UI Component | Build visual calendar (monthly/weekly views) | High | 🔴 Not Started |
| F072 | Streak Display | Show current streak and longest streak | High | 🔴 Not Started |
| F073 | Activity Indicators | Visual indicators for completed activities | High | 🔴 Not Started |
| F074 | Motivational Badges | Display achievement badges or milestones | Low | 🔴 Not Started |
| F075 | Program Dashboard | Build mesocycle overview screen | High | 🔴 Not Started |
| F076 | Current Week Display | Show current week progress | High | 🔴 Not Started |
| F077 | Upcoming Workouts View | Display upcoming workout schedule | High | 🔴 Not Started |
| F078 | Cardio Suggestions | Show optional cardio suggestions on rest days | Medium | 🔴 Not Started |
| F079 | Dashboard Streak Integration | Integrate streak display into dashboard | Medium | 🔴 Not Started |

## v0.8.0-polish-deployment - 🔴 Not Started
Testing, polish, and deployment preparation.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F080 | Unit Tests - Backend | Write unit tests for critical business logic | High | 🔴 Not Started |
| F081 | Unit Tests - Frontend | Write unit tests for React components | Medium | 🔴 Not Started |
| F082 | Integration Tests | Write integration tests for API endpoints | High | 🔴 Not Started |
| F083 | End-to-End Tests | Write E2E tests for critical user flows | High | 🔴 Not Started |
| F084 | Performance Testing | Test mesocycle generation, AI swap, workout load times | High | 🔴 Not Started |
| F085 | Error Handling | Implement comprehensive error handling and user feedback | High | 🔴 Not Started |
| F086 | Loading States | Add loading indicators throughout app | Medium | 🔴 Not Started |
| F087 | UI Polish | Refine UI/UX across all screens | Medium | 🔴 Not Started |
| F088 | Backend Deployment | Deploy Spring Boot and FastAPI to Railway/Vercel | High | 🔴 Not Started |
| F089 | Web App Deployment | Deploy Expo web app to Vercel | High | 🔴 Not Started |
| F090 | iOS App Build | Build and submit iOS app to TestFlight | High | 🔴 Not Started |
| F091 | Monitoring Setup | Set up error tracking and monitoring (Sentry) | Medium | 🔴 Not Started |
| F092 | Documentation | Create user documentation and onboarding guides | Medium | 🔴 Not Started |
| F093 | Privacy Policy & Terms | Write and publish privacy policy and terms of service | High | 🔴 Not Started |

## v0.9.0-beta-launch - 🔴 Not Started
Beta testing and launch preparation.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F094 | Beta Tester Recruitment | Recruit 10-20 beta testers | High | 🔴 Not Started |
| F095 | Feedback Collection System | Set up feedback collection mechanism | High | 🔴 Not Started |
| F096 | Beta Bug Fixes | Fix critical bugs reported by beta testers | High | 🔴 Not Started |
| F097 | Performance Optimization | Optimize based on beta testing feedback | Medium | 🔴 Not Started |
| F098 | Feature Refinement | Refine features based on user feedback | Medium | 🔴 Not Started |
| F099 | Launch Marketing Prep | Prepare marketing materials for public launch | Low | 🔴 Not Started |

## Backlog
Features and enhancements not yet assigned to a version.

| ID  | Feature             | Description                               | Priority | Status |
|-----|---------------------|-------------------------------------------|----------|--------|
| F100 | Apple Health Integration | Sync with Apple Health for automatic step/cardio tracking | Medium | 🔴 Not Started |
| F101 | Advanced Cardio Features | Heart rate zones, pace tracking, calorie estimates | Low | 🔴 Not Started |
| F102 | RIR/RPE Tracking | Track Reps in Reserve and Rate of Perceived Exertion per set | Medium | 🔴 Not Started |
| F103 | Rest Timers | Add countdown timers between sets | Low | 🔴 Not Started |
| F104 | Progress Charts | Visualize volume progression and strength gains over time | Medium | 🔴 Not Started |
| F105 | Exercise Video Library | Add video demonstrations with form cues | Low | 🔴 Not Started |
| F106 | Social Features | Share workouts, follow friends, community features | Low | 🔴 Not Started |
| F107 | Advanced Periodization | Undulating and block periodization models | Low | 🔴 Not Started |
| F108 | Deload Week Automation | Automatically schedule deload weeks | Medium | 🔴 Not Started |
| F109 | Wearable Integration | Integrate with Apple Watch and fitness trackers | Medium | 🔴 Not Started |
| F110 | Exercise History & PRs | Track exercise history and personal records | Medium | 🔴 Not Started |
| F111 | Workout Notes | Add notes and feedback to workouts | Low | 🔴 Not Started |
| F112 | Data Export | Export workout data to CSV/JSON | Low | 🔴 Not Started |
| F113 | Native Android App | Build native Android app | Medium | 🔴 Not Started |
| F114 | Offline Mode | Enable offline workout logging with sync | Low | 🔴 Not Started |
| F115 | Multi-Language Support | Add support for multiple languages | Low | 🔴 Not Started |
| F116 | Custom Exercise Creation | Allow users to create custom exercises | Medium | 🔴 Not Started |
| F117 | Program Sharing | Share workout programs between users | Low | 🔴 Not Started |

