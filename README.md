# UniBridge GH

![UniBridge GH Logo](docs/logo.png)

**UniBridge GH** is a unified application platform for Ghanaian tertiary admissions - essentially a "Common App" for Ghana's universities. Students can apply to multiple institutions with a single application, eliminating redundant data entry while maintaining institution-specific requirements.

## 🚀 Features

- **One Application, Multiple Universities**: Fill out information once, apply everywhere
- **Dynamic Form System**: Institution-specific forms via JSON DSL
- **Secure Document Management**: Encrypted storage with deduplication
- **Real-time Validation**: Smart form validation with cross-field rules
- **Cryptographic Integrity**: Immutable application snapshots with SHA256 hashing
- **University Admin Portal**: Review and manage applications
- **Comprehensive Audit Trail**: Track every action for compliance

## 🏗️ Architecture

### Backend

- **FastAPI** with async/await support
- **PostgreSQL** with SQLAlchemy ORM
- **Redis** for caching and rate limiting
- **MinIO** (S3-compatible) for document storage
- **Pydantic** for data validation
- **Alembic** for database migrations

### Frontend

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Query** for state management
- **React Hook Form** with Zod validation
- **Radix UI** for accessible components

### Infrastructure

- **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **Structured logging** with JSON format
- **Health checks** and monitoring

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Python** 3.11+
- **Docker** and Docker Compose
- **Git**

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/unibridge-gh/platform.git
   cd platform
   ```

2. **Start with Docker Compose**

   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

   # Start all services
   docker-compose up -d
   ```

3. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/api/v1/docs
   - **MinIO Console**: http://localhost:9001
   - **PostgreSQL**: localhost:5432

### Manual Development Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -e .[dev]

# Set up environment
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start development server
npm run dev
```

## 📋 Project Structure

```
UniBridge Ghana/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── core/           # Configuration, security, logging
│   │   ├── db/             # Database models and session
│   │   ├── routers/        # API endpoints
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── tests/              # Backend tests
│   ├── scripts/            # Database seeds and utilities
│   └── alembic/            # Database migrations
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities and API client
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
├── infrastructure/         # Docker and deployment
├── docs/                   # Documentation
└── docker-compose.yml      # Development environment
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test types
pytest tests/unit/
pytest tests/integration/
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run type checking
npm run type-check
```

## 📊 Code Quality

### Linting and Formatting

```bash
# Backend (Python)
cd backend
ruff check .                # Lint
ruff check . --fix          # Auto-fix
black .                     # Format
mypy app/                   # Type check

# Frontend (TypeScript)
cd frontend
npm run lint                # Lint
npm run lint:fix            # Auto-fix
npm run format              # Format
npm run type-check          # Type check
```

### Pre-commit Hooks

```bash
# Install pre-commit hooks
cd backend
pre-commit install

# Run hooks manually
pre-commit run --all-files
```

## 🚀 Deployment

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET_KEY=your-secret-key
S3_ENDPOINT=http://minio:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
REDIS_URL=redis://redis:6379/0
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Production Deployment

```bash
# Build and deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Or deploy to cloud platforms
# (See docs/deployment/ for specific platform guides)
```

## 📚 API Documentation

- **Interactive Docs**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc
- **OpenAPI Spec**: http://localhost:8000/api/v1/openapi.json

### Key Endpoints

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/institutions` - List institutions
- `POST /api/v1/applications` - Create application
- `POST /api/v1/applications/{id}/submit` - Submit application

## 🔐 Security

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **CORS Protection** with configurable origins
- **Rate Limiting** to prevent abuse
- **SQL Injection Protection** via SQLAlchemy ORM
- **File Upload Validation** with type and size limits
- **Cryptographic Signatures** for application integrity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. **Follow the MVP Sprint Plan** (see literature.md)
2. **Write tests** for new features
3. **Update documentation** as needed
4. **Run quality checks** before committing
5. **Request code review** from team members

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: [docs.unibridge.gh](https://docs.unibridge.gh)
- **Issues**: [GitHub Issues](https://github.com/unibridge-gh/platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/unibridge-gh/platform/discussions)
- **Email**: dev@unibridge.gh

## 📈 Roadmap

- [x] MVP Core Features (Week 1-3)
- [ ] WASSCE Results Integration
- [ ] Real Payment Gateway Integration
- [ ] Advanced Document Management
- [ ] Mobile Application
- [ ] Multi-language Support
- [ ] Analytics Dashboard

---

**Built with ❤️ for Ghana's educational future**
