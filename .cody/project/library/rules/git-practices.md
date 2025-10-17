# Git Practices

## Commit Guidelines

### 1. Commit After Each Task
- After successfully completing each task from any `tasklist.md`, **IMMEDIATELY** commit the changes to git
- Use a descriptive commit message that references the task ID and describes what was completed
- **Commit Message Format:** `"Complete [Task ID]: [Task Description]"`
- **Examples:**
  - `"Complete T015: Test Spring Boot Startup"`
  - `"Complete T025: Create AuthController with register and login endpoints"`
  - `"Complete T047: Create Login Screen"`

### 2. When to Commit
- Commit after each individual task is fully completed
- Ensure all code changes are implemented
- Verify no linter errors are present
- Confirm the functionality works as expected
- Run any applicable tests before committing

### 3. Commit Best Practices
- Keep commits atomic (one task = one commit)
- Write clear, descriptive commit messages
- Include task ID for traceability
- Commit frequently to maintain clean git history
- Ensure code compiles/runs before committing

## Purpose
This workflow ensures:
- Clean git history with granular, trackable commits
- Easy rollback to any specific task if needed
- Clear progress tracking
- Traceability between tasks and code changes

