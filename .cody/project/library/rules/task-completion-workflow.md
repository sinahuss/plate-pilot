# Task Completion Workflow Rules

## Git Commit Requirements

**CRITICAL RULE:** When working through tasks in any `tasklist.md` file:

### 1. Commit After Each Task
- After successfully completing each task, **IMMEDIATELY** commit the changes to git
- Use a descriptive commit message that references the task ID and describes what was completed
- Format: `"Complete [Task ID]: [Task Description]"`
- Example: `"Complete T015: Test Spring Boot Startup"`

### 2. Stop on Errors or Issues
- If a task encounters ANY errors or cannot be fully completed:
  - **DO NOT** skip the task
  - **DO NOT** mark it as completed
  - **STOP IMMEDIATELY**
  - Report the specific error or issue to the USER
  - Wait for USER guidance on how to proceed

### 3. Task Completion Criteria
A task is only considered complete when:
- All code changes are implemented
- No linter errors are present
- The functionality works as expected
- All tests (if applicable) pass
- Changes are committed to git

### 4. Error Handling Protocol
When encountering issues:
1. Document the exact error message
2. Identify which task it occurred in
3. Explain what was attempted
4. Stop and report to USER
5. Wait for USER to provide fixes or guidance
6. Resume only after USER approval

### 5. No Skipping
- Never skip a task due to errors
- Never proceed to the next task if the current one has unresolved issues
- Maintain strict sequential task execution as defined by dependencies

## Purpose
This workflow ensures:
- Clean git history with granular commits
- Easy rollback if needed
- Clear tracking of progress
- Immediate issue identification
- USER involvement in problem resolution

