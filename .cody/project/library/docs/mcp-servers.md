# MCP Servers Configuration

This document describes the Model Context Protocol (MCP) servers installed for the Plate Pilot project in Cursor.

## Installed MCP Servers

### 1. Supabase MCP Server
**Purpose:** Direct integration with our PostgreSQL database hosted on Supabase

**Use Cases:**
- Database schema exploration and migrations
- Execute SQL queries for testing and debugging
- Monitor database logs for API, Postgres, Auth, Storage, and Realtime services
- Get security and performance advisors
- Check for missing RLS policies
- Generate TypeScript types from database schema
- Manage Edge Functions (if used in future)

**Why It's Critical:**
- Plate Pilot uses Supabase/Railway for PostgreSQL hosting
- Core data: users, mesocycles, workouts, exercises, workout logs
- Essential for database migrations with Flyway
- Security audits for user data (GDPR compliance requirement)

---

### 2. GitMCP Server
**Purpose:** Git repository documentation and code search for Plate Pilot

**Use Cases:**
- Fetch and search project documentation from the GitHub repository
- Semantic search within documentation
- Code search across the repository
- Access to project README and documentation files

**Why It's Critical:**
- Plate Pilot is a monorepo (backend/spring-boot, backend/fastapi, frontend/expo)
- Helps navigate and understand codebase structure
- Supports documentation-driven development aligned with Cody Framework

---

### 3. GitHub MCP Server
**Purpose:** GitHub repository management and collaboration

**Use Cases:**
- Create and manage issues for feature tracking
- Create and review pull requests
- Manage branches for version development
- Add issue comments for tracking progress
- Link issues to Cody Framework versions and tasklists

**Why It's Critical:**
- Version control is essential for multi-component project (Spring Boot + FastAPI + Expo)
- Cody Framework emphasizes committing after each phase completion
- Track feature backlog items as GitHub issues
- Solo developer project requires systematic task tracking

---

### 4. Context7 MCP Server
**Purpose:** Access up-to-date documentation for libraries and frameworks

**Use Cases:**
- Spring Boot documentation and best practices
- FastAPI documentation for the AI/LLM microservice
- React Native / Expo documentation
- TypeScript reference
- PostgreSQL / Supabase client library docs
- OpenAI API documentation (for v0.4.0+)

**Why It's Critical:**
- Multi-stack project (Java, Python, TypeScript)
- Need current documentation for:
  - Spring Boot (backend REST API)
  - FastAPI (AI microservice)
  - Expo (React Native cross-platform mobile)
  - React Native Paper (UI components)
- Always have access to latest framework updates and migration guides

---

### 5. Vercel MCP Server
**Purpose:** Deployment and hosting management for the Expo web app

**Use Cases:**
- Deploy Expo web build to Vercel
- Monitor deployment status and logs
- Manage project settings and environment variables
- Check domain availability for future custom domain
- Access deployment previews and production URLs

**Why It's Critical:**
- Plate Pilot's Expo frontend deploys to web via Vercel
- Need to manage web deployment separate from mobile builds
- Environment variable management for API_BASE_URL and FASTAPI_BASE_URL
- Future: May host FastAPI microservice on Vercel as well

---

## MCP Server Usage Notes

### When to Use Each Server

**During Planning Phase:**
- **Context7**: Research frameworks and libraries for tech stack decisions
- **GitHub**: Create repository, set up project structure

**During Build Phase:**
- **Supabase**: Create migrations, test queries, monitor database
- **GitHub**: Commit code after each phase, create PRs, track issues
- **GitMCP**: Search existing code, understand patterns
- **Context7**: Look up framework-specific implementation details
- **Vercel**: Deploy web builds for testing

**During Testing:**
- **Supabase**: Check database logs, verify data integrity
- **Vercel**: Monitor deployment logs, test web version

**During Debugging:**
- **Supabase**: Query database directly, check logs
- **GitMCP**: Search for similar implementations
- **Context7**: Look up framework debugging techniques

### Security Considerations

- **Supabase MCP** has access to production database - use carefully
- Never commit MCP configuration files with API keys to git
- Supabase server uses credentials from Cursor's MCP settings (not in repo)
- Review Supabase security advisors regularly for RLS policy gaps

### Integration with Cody Framework

These MCP servers enhance the Cody Framework workflow:
- **`:cody build`** → Use Supabase to create database migrations
- **`:cody version build`** → Use GitHub to commit after each phase
- **`:cody refresh`** → Use GitMCP to review current codebase state
- **Phase completion** → Use Vercel to deploy and test web version

---

## Adding New MCP Servers

If adding new MCP servers in the future, document them here with:
1. Server name and purpose
2. Specific use cases for Plate Pilot
3. Why it's valuable for the project
4. Any security or configuration notes

---

**Last Updated:** October 17, 2025
**Project Phase:** Build Phase - v0.1.0-foundation

