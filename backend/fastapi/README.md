# Plate Pilot - FastAPI AI Service

AI/LLM microservice for intelligent exercise recommendations and personalization.

## Overview

This FastAPI service provides AI-powered features for the Plate Pilot app:
- Exercise recommendation engine (v0.4.0+)
- AI-powered exercise swapping based on user preferences (v0.4.0+)
- Exercise similarity scoring (v0.4.0+)

**Current Version:** v0.1.0 - Basic setup with health check endpoint

## Tech Stack

- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Server:** Uvicorn (ASGI)
- **Validation:** Pydantic
- **AI/LLM:** OpenAI API (to be integrated in v0.4.0)

## Setup

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the FastAPI directory:**
   ```bash
   cd backend/fastapi
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   
   **On macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```
   
   **On Windows:**
   ```bash
   venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update values as needed (optional for v0.1.0)

### Running the Service

**Development mode (with auto-reload):**
```bash
uvicorn app.main:app --reload
```

**Production mode:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The service will be available at:
- **API:** http://localhost:8000
- **Interactive API docs (Swagger UI):** http://localhost:8000/docs
- **Alternative API docs (ReDoc):** http://localhost:8000/redoc

## API Endpoints

### Current Endpoints (v0.1.0)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Root endpoint - service information |
| GET    | `/health` | Health check endpoint |

### Future Endpoints (v0.4.0+)

- `POST /api/recommend` - Get exercise recommendations
- `POST /api/swap` - Swap exercises based on preferences
- `POST /api/similarity` - Calculate exercise similarity scores

## Project Structure

```
backend/fastapi/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Environment configuration
│   ├── routes/              # API routes (future)
│   │   └── __init__.py
│   └── services/            # Business logic (future)
│       └── __init__.py
├── venv/                    # Virtual environment (gitignored)
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable template
├── .env                     # Actual environment variables (gitignored)
└── README.md               # This file
```

## Development

### Adding New Dependencies

```bash
pip install <package-name>
pip freeze > requirements.txt
```

### Testing the Health Check

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "ok",
  "service": "Plate Pilot AI Service",
  "version": "0.1.0",
  "timestamp": "2025-01-15T12:00:00.000000"
}
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | No (for v0.1.0) | None |
| `OPENAI_API_KEY` | OpenAI API key | No (for v0.1.0) | None |
| `HOST` | Server host | No | 0.0.0.0 |
| `PORT` | Server port | No | 8000 |
| `CORS_ORIGINS` | Allowed CORS origins | No | localhost:3000, localhost:8080, localhost:19006 |

## Integration with Spring Boot

The Spring Boot backend will call this FastAPI service for AI-powered features:

```
Frontend (Expo) → Spring Boot API → FastAPI AI Service → OpenAI API
```

- Spring Boot handles authentication, business logic, and data persistence
- FastAPI handles AI/LLM operations for exercise intelligence

## Next Steps (v0.4.0)

- [ ] Integrate OpenAI API
- [ ] Implement exercise recommendation engine
- [ ] Build hybrid recommendation algorithm (rule-based + LLM)
- [ ] Create exercise similarity scoring
- [ ] Add swap decision logic

## Troubleshooting

**Issue:** `ModuleNotFoundError` when running uvicorn

**Solution:** Make sure you're in the `backend/fastapi` directory and the virtual environment is activated.

**Issue:** Port 8000 already in use

**Solution:** Either kill the process using port 8000 or run on a different port:
```bash
uvicorn app.main:app --reload --port 8001
```

## License

Copyright © 2025 Plate Pilot

