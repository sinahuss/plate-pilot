# Product Requirements Document (PRD)
This document formalizes the idea and defines the what and the why of the product the USER is building.

## Section Explanations
| Section           | Overview |
|-------------------|--------------------------|
| Summary           | Sets the high-level context for the product. |
| Goals             | Articulates the product's purpose — core to the "why". |
| Target Users      | Clarifies the audience, essential for shaping features and priorities. |
| Key Features      | Describes what needs to be built to meet the goals — part of the "what". |
| Success Criteria  | Defines what outcomes validate the goals. |
| Out of Scope      | Prevents scope creep and sets boundaries. |
| User Stories      | High-level stories keep focus on user needs (why) and guide what to build. |
| Assumptions       | Makes the context and unknowns explicit — essential for product clarity. |
| Dependencies      | Identifies blockers and critical integrations — valuable for planning dependencies and realism. |

## Summary
Plate Pilot is an AI-powered weightlifting app that combines science-based mesocycle programming with intelligent exercise personalization to help bodybuilders create and follow workout plans they actually enjoy, maximizing long-term adherence and muscle growth.

**Current Development Status:** v0.1.0-foundation is in progress. The monorepo structure has been established, PostgreSQL database is set up, and initial database schema for users has been designed with Flyway migrations. Spring Boot API has been initialized with authentication endpoints, FastAPI service is set up, and Expo frontend project is initialized. The project is ready for frontend authentication UI development and end-to-end testing.

## Goals
- **Maximize Training Adherence:** Enable users to train consistently for 12+ weeks by providing personalized programs with exercises they enjoy
- **Apply Evidence-Based Programming:** Implement science-based volume landmarks (MEV, MAV, MRV) and frequency recommendations for optimal hypertrophy
- **Automate Intelligent Personalization:** Use AI to recommend and swap exercises based on user preferences while maintaining program effectiveness
- **Enable Progressive Overload:** Automatically adjust weekly training volume and intensity based on logged performance data
- **Reduce Programming Friction:** Eliminate the need for users to manually research, plan, and adjust their training programs

## Target Users
**Primary Audience:** Intermediate to advanced bodybuilders and weightlifters focused on muscle hypertrophy (muscle growth)

**User Characteristics:**
- Training experience: 6 months to 10+ years
- Goal: Build muscle mass using science-based principles
- Pain point: Frustrated with rigid, generic workout apps that don't account for individual exercise preferences
- Willing to: Log workouts consistently and rate exercise preferences
- May understand: Basic hypertrophy concepts (MEV/MRV/MAV) or willing to learn

## Key Features

### v1.0 Must-Have Features

**1. User Onboarding Flow**
- Experience level assessment (beginner, intermediate, advanced)
- Training frequency selection (3-6 days per week)
- Workout split preference (PPL, Upper/Lower, etc.)
- General exercise preferences (compound, cable, machine, smith, barbell, dumbbell)
- Equipment availability
- Cardio preferences (frequency on rest days, preferred cardio types)

**2. Science-Based Mesocycle Generation**
- Generate 4-12 week mesocycles based on user profile
- Apply optimal volume landmarks per muscle group (MEV, MAV, MRV)
- Set appropriate training frequency for each muscle group
- Include progressive overload strategy
- Optional muscle group focus/prioritization

**3. Exercise Preference System**
- User rates each exercise in generated program (like/neutral/dislike)
- AI-powered exercise swapping using hybrid approach:
  - Rule-based filtering by muscle group, movement pattern, equipment
  - LLM API for intelligent selection and ranking
- Smart regeneration: Swap individual exercises vs. full program based on dislike count

**4. Workout Logging**
- Log sets, reps, and weight for each exercise
- Mark sets as complete
- Track workout completion
- Simple, fast mobile-friendly interface

**5. Weekly Auto-Adjustment**
- Analyze logged performance data
- Automatically adjust upcoming week's volume and intensity
- Ensure progressive overload without overtraining
- Keep volume within MEV-MRV range per muscle group

**6. User Authentication & Data Management**
- Secure user registration and login
- GDPR-compliant data storage
- User profile management
- Data persistence across devices

**7. Consistency Calendar & Tracker**
- Visual calendar showing workout completion by day
- Streak tracking (consecutive workout days)
- Monthly/weekly consistency overview
- Visual indicators for completed workouts (weightlifting and cardio)
- Motivation through visual progress

**8. Cardio Logging**
- Manual cardio session logging
- Cardio types: Running, Walking, Cycling, Other
- Log distance, time, and/or steps
- Optional cardio suggestions on rest days (based on onboarding preferences)
- Cardio counts as "active day" on consistency calendar
- Simple, fast mobile-friendly logging interface

### v2.0+ Nice-to-Have Features
- **Apple Health Integration & Step Tracking:** Sync with Apple Health to automatically track daily steps and cardio activities; configurable step threshold that counts as "active day" on consistency calendar
- **Advanced Cardio Features:** Heart rate zones, pace tracking, calorie estimates, cardio programming intelligence
- RIR (Reps in Reserve) and RPE (Rate of Perceived Exertion) tracking per set
- Rest timers between sets
- Progress charts and analytics (volume progression, strength gains, cardio trends)
- Exercise video library with form cues
- Social features (share workouts, follow friends)
- Advanced periodization models (undulating, block periodization)
- Deload week automation
- Integration with wearables (Apple Watch, fitness trackers) for automatic cardio tracking
- Exercise history and personal records
- Workout notes and feedback
- Export workout data

## Success Criteria

**User Engagement Metrics:**
- Users complete 12+ consecutive weeks of training (85%+ adherence rate)
- Average 4+ workout logging sessions per week
- 70%+ of users rate their program positively after mesocycle completion

**Product Performance:**
- Mesocycle generation completes in <10 seconds
- Exercise swap recommendations complete in <3 seconds
- Mobile app loads workout view in <2 seconds
- 95%+ uptime for core services

**User Satisfaction:**
- Users report feeling confident in their science-based program
- Users express enjoyment of their personalized exercise selection
- Net Promoter Score (NPS) >40 within first 3 months

**Business Metrics (Future):**
- Free-to-paid conversion rate >10% after first mesocycle
- Monthly active users (MAU) growth rate
- Low churn rate (<15% monthly for paid users)

## Out of Scope

**Explicitly NOT in v1.0:**
- Apple Health integration and automatic step/cardio tracking (v2.0+)
- Advanced cardio features (heart rate zones, pace tracking, calorie estimates, cardio programming intelligence)
- RIR/RPE tracking per set
- Rest timers
- Progress charts and analytics
- Exercise video library
- Social features or community
- Nutrition tracking or meal planning
- Mobility/stretching routines
- Integration with other fitness apps
- Native Android app (web works on Android browsers)
- Offline mode
- Multiple language support (English only for v1.0)
- Custom exercise creation by users
- Program sharing between users
- AI form check or video analysis
- Wearable device integrations (beyond basic step tracking in v2.0+)

## User Stories

**As a bodybuilder**, I want to generate a personalized mesocycle based on my experience and preferences, so I can follow a science-based program without spending hours researching optimal volume and frequency.

**As a user who dislikes certain exercises**, I want to rate exercises and get AI-powered alternatives, so I can stay motivated and consistent with workouts I actually enjoy.

**As someone training for hypertrophy**, I want my program to automatically adjust based on my logged performance, so I progressively overload without second-guessing if I'm doing too much or too little volume.

**As a busy lifter**, I want to quickly log my sets and reps during workouts, so I can focus on training instead of complicated tracking interfaces.

**As an intermediate lifter**, I want to select my preferred training split (PPL, Upper/Lower, etc.), so the program fits my schedule and training style.

**As a user prioritizing a muscle group**, I want to specify focus areas in my mesocycle, so I can bring up lagging body parts with optimal volume allocation.

**As someone who's tried generic apps**, I want confidence that my program is personalized AND science-based, so I can trust the system and execute without constantly questioning my plan.

**As a user building training habits**, I want to see a visual calendar of my workout consistency and track my streaks, so I stay motivated and accountable to show up each week.

**As a bodybuilder who does cardio on rest days**, I want to log my cardio sessions (running, cycling, walking, etc.) in the same app as my weightlifting, so I can track all my training activity in one place and see my overall consistency.

## Assumptions

**User Behavior:**
- Users will log workouts consistently (at least 3-4x per week)
- Users understand or are willing to learn basic hypertrophy terminology (MEV/MRV/MAV)
- Users have access to a commercial gym or home gym with standard equipment
- Users can accurately assess their experience level
- Users will provide honest exercise preference ratings

**Technical:**
- We can build or source a comprehensive exercise database with accurate muscle group mappings
- AI/LLM can make biomechanically equivalent exercise substitutions
- API costs will remain manageable at scale (or can switch to open-source LLM if needed)
- Hybrid AI approach (rule-based + LLM) will provide good enough personalization for v1.0
- PostgreSQL can handle workout logging data at scale
- Free tier services (Supabase, Railway, Vercel) will support beta testing phase

**Product:**
- Science-based volume landmarks (MEV/MRV/MAV) from published research apply broadly to target users
- Weekly volume adjustment based on logged performance will improve results vs. static programs
- Exercise preference personalization is the key differentiator vs. competitors
- Users value AI-powered personalization over manual exercise selection
- 8-12 week mesocycles are the optimal program length for hypertrophy

**Business:**
- Target market exists and is willing to pay for personalized programming
- Freemium model can convert users after they complete one free mesocycle
- Solo developer can build and maintain v1.0 within 8-12 weeks
- Market has room for another player despite existing competitors (RP, Hevy, Boostcamp, Fitbod)

## Dependencies

**External Services:**
- **OpenAI API:** Required for AI-powered exercise recommendations and swapping
- **Supabase:** PostgreSQL database hosting and user authentication
- **Vercel:** Hosting for Expo web application
- **Expo:** React Native framework for cross-platform development

**Data & Content:**
- **Exercise Database:** Need comprehensive database with exercises categorized by:
  - Muscle groups (primary and secondary)
  - Movement patterns (horizontal push/pull, vertical push/pull, hip hinge, squat, etc.)
  - Equipment type (barbell, dumbbell, cable, machine, bodyweight, smith machine)
  - Difficulty level
  - Biomechanical similarity scores for substitutions
- **Scientific Research:** Volume landmark data (MEV/MAV/MRV) per muscle group from published literature

**Technical:**
- **Spring Boot Backend:** Main API service for business logic
- **Python FastAPI Backend:** AI/LLM microservice for exercise intelligence
- **PostgreSQL Database:** Data persistence for users, programs, workouts, exercises
- **React/Expo Frontend:** Cross-platform mobile app (iOS + web)

**Domain Knowledge:**
- Understanding of hypertrophy training principles
- Knowledge of exercise biomechanics for proper substitutions
- Familiarity with periodization and program design

**Potential Blockers:**
- API rate limits or cost overruns during beta
- Exercise database creation time (may need to start with 100-200 core exercises)
- Individual recovery variance may require extensive calibration testing
- Legal/liability concerns around providing training advice (may need disclaimer/terms)
- GDPR compliance implementation for EU users

