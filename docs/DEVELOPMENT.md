# Development Guide

This guide covers the complete development setup and workflow for UniBridge GH.

## Quick Start

Run the setup script to get everything running:

```bash
./setup-dev.sh
```

This will:

- Check prerequisites
- Set up environment files
- Start infrastructure services
- Install dependencies
- Start the application

## Tech Stack Summary

### Backend (FastAPI + Python 3.11)

- **FastAPI 0.104+** - Modern, fast web framework
- **SQLAlchemy 2.0** - Async ORM with type hints
- **Pydantic v2** - Data validation and serialization
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching and session storage
- **Alembic** - Database migrations
- **pytest** - Testing framework
- **Ruff + Black** - Linting and formatting
- **structlog** - Structured logging

### Frontend (Next.js 14 + TypeScript)

- **Next.js 14** - React framework with App Router
- **TypeScript 5.3** - Type safety
- **Tailwind CSS 3.3** - Utility-first CSS
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Runtime type validation
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Infrastructure & DevOps

- **Docker & Docker Compose** - Containerization
- **MinIO** - S3-compatible object storage
- **GitHub Actions** - CI/CD pipeline
- **Playwright** - E2E testing
- **Trivy** - Security scanning

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# Write tests
# Update documentation

# Run quality checks
cd backend && ruff check . && black . && mypy app/
cd frontend && npm run lint && npm run type-check

# Run tests
cd backend && pytest
cd frontend && npm test

# Commit and push
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### 2. Database Changes

```bash
cd backend

# Create migration
alembic revision --autogenerate -m "Description of change"

# Review generated migration file
# Edit if needed

# Apply migration
alembic upgrade head

# Test with fresh database
alembic downgrade base
alembic upgrade head
```

### 3. API Development

1. **Define Pydantic schemas** in `app/schemas/`
2. **Create database models** in `app/db/models/`
3. **Implement business logic** in `app/services/`
4. **Create API endpoints** in `app/routers/`
5. **Write tests** in `tests/`

### 4. Frontend Development

1. **Define TypeScript types** in `src/types/`
2. **Create reusable components** in `src/components/`
3. **Implement pages** in `src/app/`
4. **Add API client methods** in `src/lib/api.ts`
5. **Write tests** in `__tests__/`

## Environment Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL=postgresql://unibridge:password@localhost:5432/unibridge_dev
TEST_DATABASE_URL=postgresql://unibridge:password@localhost:5432/unibridge_test

# Security
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=unibridge-documents

# Redis
REDIS_URL=redis://localhost:6379/0

# Application
ENVIRONMENT=development
DEBUG=true
API_V1_STR=/api/v1
PROJECT_NAME=UniBridge GH
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NODE_ENV=development
```

## Testing Strategy

### Backend Testing

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/ --cov-report=html

# Run specific test types
pytest tests/unit/          # Unit tests
pytest tests/integration/   # Integration tests

# Run with verbose output
pytest -v

# Run specific test
pytest tests/unit/test_auth.py::test_create_user
```

### Frontend Testing

```bash
cd frontend

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage

# Type checking
npm run type-check
```

## Code Quality

### Backend (Python)

```bash
cd backend

# Linting
ruff check .                # Check for issues
ruff check . --fix          # Auto-fix issues

# Formatting
black .                     # Format code
black --check .             # Check formatting

# Type checking
mypy app/                   # Type check

# Import sorting
isort .                     # Sort imports
```

### Frontend (TypeScript)

```bash
cd frontend

# Linting
npm run lint                # Check for issues
npm run lint:fix            # Auto-fix issues

# Formatting
npm run format              # Format code
npm run format:check        # Check formatting

# Type checking
npm run type-check          # TypeScript check
```

## Debugging

### Backend Debugging

1. **Add debugger in code:**

   ```python
   import pdb; pdb.set_trace()
   ```

2. **VS Code debugging:**

   - Set breakpoints in VS Code
   - Use "Python: FastAPI" debug configuration

3. **Logs:**
   ```bash
   docker-compose logs -f backend
   ```

### Frontend Debugging

1. **Browser DevTools:**

   - Console for JavaScript errors
   - Network tab for API calls
   - React DevTools extension

2. **VS Code debugging:**

   - Set breakpoints in VS Code
   - Use "Next.js: debug full stack" configuration

3. **Logs:**
   ```bash
   docker-compose logs -f frontend
   ```

## Performance Optimization

### Backend

- Use async/await for I/O operations
- Implement database query optimization
- Add Redis caching for expensive operations
- Use connection pooling
- Profile with `py-spy` or `cProfile`

### Frontend

- Implement code splitting with dynamic imports
- Use React.memo() for expensive components
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Use React Query for data fetching

## Security Best Practices

### Backend

- Always validate input with Pydantic
- Use parameterized queries (SQLAlchemy handles this)
- Implement rate limiting
- Secure file uploads with validation
- Use HTTPS in production
- Keep dependencies updated

### Frontend

- Validate user input with Zod schemas
- Sanitize data before rendering
- Use HTTPS for API calls
- Implement proper error boundaries
- Keep dependencies updated

## Deployment

### Local Development

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild services
docker-compose up -d --build
```

### Production Deployment

1. **Environment setup:**

   - Set production environment variables
   - Use strong JWT secrets
   - Configure proper CORS origins
   - Set up SSL certificates

2. **Database:**

   - Use managed PostgreSQL service
   - Run migrations before deployment
   - Set up backups

3. **Storage:**

   - Use AWS S3 or compatible service
   - Configure proper bucket policies

4. **Monitoring:**
   - Set up health checks
   - Configure logging
   - Monitor performance metrics

## Troubleshooting

### Common Issues

1. **Port conflicts:**

   ```bash
   # Check what's using ports
   lsof -i :3000  # Frontend
   lsof -i :8000  # Backend
   lsof -i :5432  # PostgreSQL
   ```

2. **Database connection issues:**

   ```bash
   # Check PostgreSQL is running
   docker-compose ps postgres

   # Check logs
   docker-compose logs postgres
   ```

3. **Import errors:**

   ```bash
   # Backend: Make sure virtual environment is activated
   source .venv/bin/activate

   # Frontend: Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Docker issues:**
   ```bash
   # Reset Docker environment
   docker-compose down -v
   docker system prune -f
   docker-compose up -d
   ```

### Getting Help

- Check the logs: `docker-compose logs -f [service]`
- Review the GitHub Issues
- Check the API documentation: http://localhost:8000/api/v1/docs
- Review the literature.md for project context

## VS Code Configuration

### Recommended Extensions

- Python (Microsoft)
- Pylance (Microsoft)
- Black Formatter (Microsoft)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- GitLens
- Docker (Microsoft)
- Thunder Client (for API testing)

### Workspace Settings (.vscode/settings.json)

```json
{
  "python.defaultInterpreterPath": "./backend/.venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": false,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

This development guide should help you get up to speed quickly with the UniBridge GH codebase!
