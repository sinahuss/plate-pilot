# Discovery
This document captures the raw, unfiltered idea or initial AI prompt that sparked the project.

## Starting Prompt
I want to create a weightlifting app that will help bodybuilders program their weightlifting routines on a weekly, monthly, and mesocycle basis.

The main selling point/features will be: 
- Customization based on likes/dislikes of exercises utilizing AI
- Science-based programming utilizing optimal volume (MRV, MEV, MAV, etc) and frequency for each muscle group
- Potentially ability to log RIR or RPE for each set

Target users will be those concerned with hypertrophy.

Potential architecture I'm thinking of is 1 or 2 backend microservices, and a browser and/or iOS based frontend that is mobile friendly.

## Questions

**AGENT Q1:** What specific problem or pain point are bodybuilders experiencing with their current weightlifting programming that your app will solve?

**USER A1:** Current apps use generic programs that don't account for individual preferences - if someone hates leg extensions, they're stuck doing them or manually replacing exercises. This kills motivation and adherence.

---

**AGENT Q2:** What does success look like for users of this app? How will they know the app is working well for them?

**USER A2:** Users will train consistently for 12+ weeks without quitting because they actually enjoy their workouts - the program adapts to exercises they like, so adherence stays high. Also, users will feel confident their program is science-based and personalized - they won't question if they're doing enough or too much, just trust the system and execute.

---

**AGENT Q3:** Walk me through a typical user journey - how do they start using the app and what does their weekly interaction look like?

**USER A3:** 
- **Onboarding:** User first enters experience level, preferred frequency, workout split, general exercise preference (compound, cable, machine, smith), etc.
- **Mesocycle:** App asks if a muscle group is being focused, then generates mesocycle. Each exercise, user inputs likes/neutral/dislikes. The app will then readjust the program depending on number of dislikes (simply swapping some exercises vs generating new mesocycle program).
- **Daily:** User logs workouts, maybe with rest timers, RIR/RPE trackers, sets/reps, likes/neutral/dislikes
- **Weekly:** App adjusts week's volume/intensity based on daily data.

---

**AGENT Q4:** What are the absolute must-have features for version 1.0 that you cannot launch without?

**USER A4:** MVP includes: User onboarding, mesocycle generation with science-based volume/frequency, exercise preference system (like/neutral/dislike), basic workout logging (sets/reps/weight), and weekly auto-adjustment. RIR/RPE and rest timers can wait for v2.0.

---

**AGENT Q5:** What constraints should we keep in mind for this project?

**USER A5:**
- **Budget:** Solo project, so minimize costs with free tiers
- **Timeline:** Beta-testable version in 8-12 weeks
- **Tech:** I'm familiar with Spring Boot, React, AWS, SQL. New technology can be recommended if it fits the use case.
- **Integrations:** None needed for v1.0
- **Monetization:** Consider future monetization via subscriptions (freemium app model?)
- **Privacy:** Standard GDPR compliance for user data

---

**AGENT Q6:** What are users doing today to solve this problem? What existing apps, tools, or methods are your target users currently using?

**USER A6:** RP app is around $30, Hevy has replacement exercises but not AI powered, Boostcamp is rigidly structured workouts. I believe fitbod generates a new workout daily instead of by mesocycle.

---

**AGENT Q7:** What risks or assumptions should we note early that could impact the project's success?

**USER A7:** Multiple concerns:
- Assumption: Target users understand basic hypertrophy concepts (MEV/MRV/MAV). Risk: If they don't, we need educational onboarding. Assumption: We can build/source accurate exercise database with muscle group mappings. Risk: AI exercise swaps may not be biomechanically equivalent.
- Risk: Algorithm for calculating optimal volume per muscle group may not work for everyone - individual recovery varies widely. Assumption: Users will log workouts consistently, otherwise weekly adjustments can't work. Risk: May need professional liability insurance if giving training advice.
- Assumption: AI/LLM can make good exercise substitutions based on movement patterns and equipment. Risk: OpenAI API costs could spike with scale. Risk: Users may abandon if initial mesocycle feels too hard/easy - calibration is critical.

---

**AGENT Q8:** For the AI-powered exercise customization (your main differentiator), how should it work technically?

**USER A8:** Hybrid approach - Rule-based filtering (muscle group, equipment available, movement pattern) narrows options, then LLM API ranks/selects best match based on user's overall program context and preferences. Keeps API calls minimal and costs low.

---

**AGENT Q9:** Would you recommend a different tech stack?

**USER A9:** Yes (agreed to recommended stack adjustments)

## Discovery Summary

### Product Vision
Plate Pilot is a hypertrophy-focused weightlifting app that solves the critical problem of rigid, generic workout programs that kill user motivation and adherence. The app combines AI-powered exercise personalization with science-based mesocycle programming to create truly customized workout plans that users actually enjoy following.

### Target Users
Bodybuilders and weightlifters focused on muscle hypertrophy (muscle growth) who understand or are willing to learn basic training principles.

### Core Problem
Current fitness apps (RP Hypertrophy, Hevy, Boostcamp, Fitbod) force users into rigid programs. When a user dislikes an exercise (e.g., leg extensions), they're stuck doing it or manually replacing it, which creates friction and reduces long-term adherence.

### Solution
An intelligent workout programming app that:
1. Generates science-based mesocycles using optimal volume landmarks (MEV, MAV, MRV) per muscle group
2. Allows users to rate exercises (like/neutral/dislike)
3. Uses AI to intelligently swap or regenerate programs based on preferences
4. Automatically adjusts weekly volume and intensity based on logged performance data

### Key Differentiator
Hybrid AI approach: Rule-based filtering by muscle groups, movement patterns, and equipment, followed by LLM API (OpenAI) for intelligent exercise selection and ranking. This keeps costs low while delivering true personalization.

### User Journey
1. **Onboarding:** User enters experience level, training frequency, workout split preference, general exercise preferences (compound, cable, machine, smith, etc.)
2. **Mesocycle Generation:** App asks about muscle group focus, generates science-based program, user rates each exercise
3. **Program Adjustment:** App swaps individual exercises or regenerates full program based on user feedback
4. **Daily Training:** User logs workouts (sets/reps/weight), optionally tracks RIR/RPE and uses rest timers
5. **Weekly Progression:** App automatically adjusts upcoming week's volume and intensity based on performance

### Success Metrics
- Users train consistently for 12+ weeks because they enjoy their personalized workouts
- Users feel confident in their science-based program and execute without second-guessing

### Must-Have Features (v1.0)
1. User onboarding flow (experience, frequency, split, preferences)
2. Science-based mesocycle generation with proper volume/frequency per muscle group
3. Exercise preference system (like/neutral/dislike) with intelligent swapping
4. Basic workout logging (sets/reps/weight)
5. Weekly auto-adjustment based on logged performance
6. User authentication and data persistence

### Nice-to-Have Features (v2.0+)
- RIR/RPE tracking per set
- Rest timers
- Progress charts and analytics
- Social features
- Exercise video library
- Advanced periodization models

### Technology Stack
**Frontend:**
- Expo (React Native) - single codebase for iOS and web

**Backend:**
- Spring Boot - main API, business logic, user management, workout logging
- Python FastAPI - AI/LLM service for exercise matching and recommendations

**Database:**
- PostgreSQL (via Supabase or Railway)

**Infrastructure & Services:**
- Supabase - database, authentication, storage (free tier)
- Railway or Render - backend service hosting (free tier)
- Vercel - Expo web hosting (free tier)
- OpenAI API - LLM for exercise recommendations (pay-per-use)

**Authentication:**
- Supabase Auth or Spring Security with JWT

### Project Constraints
- **Solo developer project**
- **Timeline:** 8-12 weeks to beta-testable version
- **Budget:** Bootstrap/free tiers only ($0-20/month)
- **Compliance:** Standard GDPR for user data
- **Future monetization:** Freemium subscription model

### Competitive Landscape
- **Renaissance Periodization (RP) App:** ~$30/month, science-based but rigid programs
- **Hevy:** Has exercise replacement but not AI-powered
- **Boostcamp:** Rigidly structured pre-made programs
- **Fitbod:** Generates daily workouts, not mesocycle-based planning
- **Online Coaches:** $100-300/month for personalized programming
- **DIY Spreadsheets:** Time-consuming, requires constant research

### Risks & Assumptions
**Assumptions:**
- Target users understand or can learn MEV/MRV/MAV concepts
- We can build/source accurate exercise database with proper muscle group mappings
- Users will log workouts consistently for adjustments to work
- AI/LLM can make biomechanically equivalent exercise substitutions
- 8-12 week timeline is sufficient for core features

**Risks:**
- AI exercise swaps may not be biomechanically equivalent
- Individual recovery variance means volume recommendations may not fit everyone
- Users may abandon if initial mesocycle calibration is off (too hard/easy)
- OpenAI API costs could spike with scale
- May need professional liability consideration for training advice
- Exercise database creation is time-consuming (may start with 100-200 core exercises)

### Next Steps
1. Create Product Requirements Document (PRD)
2. Create Technical Plan
3. Build MVP in 8-12 weeks
4. Beta test with target users
5. Iterate based on feedback
6. Launch with freemium model

