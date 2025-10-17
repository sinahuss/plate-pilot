# Coding Style and Documentation Rules

This document outlines coding and documentation style preferences for the Plate Pilot project. The AI AGENT should follow these rules when generating or modifying code and documentation.

## Documentation Style

### No Emojis
**DO NOT use emojis** in any documentation files, including:
- README.md files
- Code comments
- PRD, plan, or design documents
- Tasklist or feature backlog documents
- Commit messages
- API documentation
- Technical specifications

Use clear, professional text instead of emojis for headers and emphasis.

**Examples:**

❌ **BAD:**
```markdown
## 🚀 Getting Started
## 📚 Documentation
Built with ❤️ by...
```

✅ **GOOD:**
```markdown
## Getting Started
## Documentation
Built by...
```

### Exception
Emojis may be used **only** in:
- User-facing UI text within the mobile app (if explicitly requested by USER)
- Marketing materials (if explicitly requested by USER)

## Code Style

### General Principles
- Write clean, readable, and maintainable code
- Follow language-specific conventions (Java, TypeScript, Python)
- Use meaningful variable and function names
- Add comments for complex logic, but prefer self-documenting code

### Language-Specific Guidelines

**Java (Spring Boot):**
- Follow standard Java naming conventions (camelCase for methods/variables, PascalCase for classes)
- Use Lombok annotations to reduce boilerplate
- Keep controllers thin, business logic in services
- Use DTOs for API request/response objects

**TypeScript (Expo/React Native):**
- Use functional components with hooks
- Follow React naming conventions (PascalCase for components, camelCase for functions)
- Use TypeScript types/interfaces for all props and function parameters
- Prefer const over let when possible

**Python (FastAPI):**
- Follow PEP 8 style guide
- Use type hints for function parameters and return values
- Use Pydantic models for request/response validation
- Keep routes thin, business logic in services

## Commit Messages

Use conventional commit format without emojis:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**

❌ **BAD:**
```
✨ Add login feature
🐛 Fix auth bug
```

✅ **GOOD:**
```
feat: add user login endpoint
fix: resolve JWT token validation issue
```

## Comments

- Use clear, descriptive comments without emojis
- Explain "why" not "what" when the code is self-explanatory
- Keep comments up-to-date with code changes

❌ **BAD:**
```java
// 🚀 Starting the process
// ⚠️ Important: Check this!
```

✅ **GOOD:**
```java
// Initialize user session and validate credentials
// Note: This must run before any authenticated requests
```

## README and Documentation Structure

- Use clear section headers without decoration
- Provide code examples where helpful
- Keep documentation concise and actionable
- Update documentation when features change

---

**Last Updated:** v0.1.0-foundation  
**Applies To:** All current and future versions

