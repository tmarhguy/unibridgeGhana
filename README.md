<div align="center">
  <img src="docs/logo.svg" alt="UniBridge Ghana Logo" width="300" />
</div>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)](https://postgresql.org/)
[![Deployment](https://img.shields.io/badge/Deployment-Docker-2496ED)](https://docker.com/)

</div>

<div align="center">
  <h3>Ghana's first centralized university admissions platform, revolutionizing how students apply to tertiary institutions across the country.</h3>
  <p>UniBridge provides a streamlined, one-application solution for 100+ universities, integrated scholarship search, and comprehensive progress tracking.</p>
  
  <p><strong>📚 Academic & Portfolio Project</strong> - Created for educational and demonstration purposes</p>
</div>

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Architecture & Technology Stack](#architecture--technology-stack)
- [Installation & Setup](#installation--setup)
- [Usage Instructions](#usage-instructions)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Project Overview

UniBridge Ghana eliminates the traditional barriers of university applications by providing a centralized platform where students complete one comprehensive application and apply to multiple institutions simultaneously. The platform serves as Ghana's equivalent to the Common Application used in the United States, specifically designed for the Ghanaian educational ecosystem.

### Problem Statement

Previously, Ghanaian students faced:

- Repetitive application processes across multiple universities
- Fragmented scholarship and financial aid information
- Lack of standardized application tracking
- Complex document submission requirements
- Limited transparency in admissions processes

### Solution

UniBridge provides:

- **Unified Application Process**: One application for 100+ tertiary institutions
- **Integrated Financial Aid**: Comprehensive scholarship database and application tracking
- **Real-time Progress Monitoring**: Live updates on application status and deadlines
- **Secure Document Management**: Encrypted storage and streamlined document submission
- **Direct Admissions Workflow**: Streamlined process for qualified candidates

## Key Features

### Core Functionality

| Feature                       | Description                                          | Status      |
| ----------------------------- | ---------------------------------------------------- | ----------- |
| **Centralized Applications**  | Single application form for multiple universities    | ✅ Complete |
| **Multi-Institution Support** | Support for 100+ public and private universities     | ✅ Complete |
| **Direct Admissions**         | Fast-track admissions for qualified candidates       | ✅ Complete |
| **Scholarship Integration**   | Comprehensive financial aid search and application   | ✅ Complete |
| **Progress Tracking**         | Real-time application status and deadline monitoring | ✅ Complete |
| **Document Security**         | End-to-end encryption for sensitive documents        | ✅ Complete |
| **Auto-save Functionality**   | Automatic form data preservation                     | ✅ Complete |
| **Mobile Responsive**         | Full functionality across all devices                | ✅ Complete |

### Student Features

- **Smart Application Form**: Dynamic forms that adapt to institution requirements
- **University Discovery**: Advanced search and filtering by programs, location, and requirements
- **Essay Management**: Built-in writing tools with auto-save and version control
- **Payment Integration**: Multiple payment options including Mobile Money and bank transfers
- **Notification System**: Real-time alerts for deadlines, updates, and decisions
- **Analytics Dashboard**: Personal insights on application progress and success rates

### University Features

- **Admin Portal**: Comprehensive application review and management system
- **Custom Requirements**: Institution-specific supplements and requirements
- **Bulk Processing**: Efficient tools for handling large volumes of applications
- **Analytics & Reporting**: Detailed insights on applicant demographics and trends
- **Secure Communication**: Direct messaging system with applicants

### Technical Features

- **High Performance**: Sub-second page load times with optimized caching
- **Scalability**: Microservices architecture supporting concurrent users
- **Security**: Enterprise-grade encryption and data protection
- **Accessibility**: WCAG 2.1 AA compliant for inclusive access
- **Offline Support**: Progressive Web App capabilities for limited connectivity areas

## Screenshots

### Core Platform Overview

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
  <img src="docs/screenshots/landing-page.png" alt="UniBridge Ghana landing page with call-to-action button and feature highlights" loading="lazy" />
  <img src="docs/screenshots/dashboard.png" alt="Student dashboard showing application progress and university recommendations" loading="lazy" />
</div>
<p align="center"><em>Landing page and student dashboard interface</em></p>

### Application Management & Direct Admissions

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
  <img src="docs/screenshots/application-progress.png" alt="Application progress tracker with timeline and status indicators" loading="lazy" />
  <img src="docs/screenshots/direct-admissions.png" alt="Fast-track admissions interface for qualified candidates" loading="lazy" />
</div>
<p align="center"><em>Application tracking and streamlined admissions workflow</em></p>

### Financial Aid & Analytics Platform

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
  <img src="docs/screenshots/scholarship-search.png" alt="Scholarship search interface with filtering and application tracking" loading="lazy" />
  <img src="docs/screenshots/analytics.png" alt="University analytics dashboard with institutional data and trends" loading="lazy" />
</div>
<p align="center"><em>Financial aid discovery and comprehensive university analytics</em></p>

> **📷 Visual Documentation**: For additional screenshots, mobile views, and admin interfaces, see [docs/screenshots/](docs/screenshots/README.md)

## Architecture & Technology Stack

### System Architecture

```mermaid
graph TD
    A[Students & Universities] --> B[Next.js Frontend]
    B --> C[API Gateway]
    C --> D[FastAPI Backend]
    D --> E[(PostgreSQL Database)]
    D --> F[(Redis Cache)]
    D --> G[(MinIO Storage)]
    D --> H[Celery Workers]

    I[Admin Portal] --> B
    J[Mobile App] --> C

    K[Payment Gateways] --> D
    L[WASSCE API] --> D
    M[Email Service] --> H

    style B fill:#0066cc,color:#fff
    style D fill:#009688,color:#fff
    style E fill:#336791,color:#fff
    style F fill:#dc382d,color:#fff
    style G fill:#c72e29,color:#fff
```

### Frontend Architecture

```
├── Next.js 14 (App Router)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
├── React Query (State Management)
├── React Hook Form + Zod (Form Validation)
├── Radix UI (Accessible Components)
└── PWA Support (Offline Capability)
```

### Backend Architecture

```
├── FastAPI (Python Web Framework)
├── SQLAlchemy (ORM)
├── PostgreSQL (Primary Database)
├── Redis (Caching & Sessions)
├── MinIO (Document Storage)
├── Alembic (Database Migrations)
├── Pydantic (Data Validation)
└── Celery (Background Tasks)
```

### Infrastructure & DevOps

```
├── Docker (Containerization)
├── Kubernetes (Orchestration)
├── GitHub Actions (CI/CD)
├── Nginx (Load Balancing)
├── Let's Encrypt (SSL Certificates)
└── Prometheus + Grafana (Monitoring)
```

### Database Schema

```sql
-- Core Tables
├── users (students, admins, university staff)
├── universities (institution profiles and requirements)
├── applications (application submissions and status)
├── documents (secure file storage references)
├── scholarships (financial aid opportunities)
├── notifications (real-time messaging system)
└── audit_logs (comprehensive activity tracking)
```

## Installation & Setup

### Prerequisites

Before setting up UniBridge Ghana locally, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **Python** (v3.11 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6.0 or higher)
- **Docker** (optional, for containerized setup)
- **Git** (for version control)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/tmarhguy/unibridgeGhana.git
cd unibridgeGhana
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Redis configurations

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (new terminal)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Start the development server
npm run dev
```

#### 4. Database Setup

```bash
# Create PostgreSQL database
createdb unibridge_ghana

# Set up Redis (if not using Docker)
redis-server
```

### Docker Setup (Alternative)

For a containerized setup:

```bash
# Clone and navigate to project
git clone https://github.com/tmarhguy/unibridgeGhana.git
cd unibridgeGhana

# Build and run with Docker Compose
docker-compose up --build

# Run database migrations
docker-compose exec backend alembic upgrade head
```

### Production Deployment

#### Environment Configuration

```bash
# Production environment variables
export DATABASE_URL="postgresql://user:password@localhost:5432/unibridge_prod"
export REDIS_URL="redis://localhost:6379"
export SECRET_KEY="your-production-secret-key"
export ENVIRONMENT="production"
```

#### Build and Deploy

```bash
# Frontend build
cd frontend
npm run build
npm start

# Backend deployment
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Usage Instructions

### For Students

#### Getting Started

1. **Account Creation**

   ```
   Navigate to /register
   → Complete profile setup
   → Verify email address
   → Access dashboard
   ```

2. **Application Process**

   ```
   Dashboard → Start New Application
   → Complete Common Application sections:
     - Personal Information
     - Academic History (WASSCE/A-Level results)
     - Extracurricular Activities
     - Essays and Personal Statements
   → Select target universities
   → Submit application and payment
   ```

3. **Progress Tracking**
   ```
   Dashboard → My Applications
   → View real-time status updates
   → Track deadlines and requirements
   → Receive notifications for updates
   ```

#### Example Application Flow

```typescript
// Typical student workflow
const applicationFlow = {
  1: "Create account and verify email",
  2: "Complete personal information section",
  3: "Upload academic documents (WASSCE, transcripts)",
  4: "Write essays and personal statements",
  5: "Research and select target universities",
  6: "Review application and submit",
  7: "Pay application fees via Mobile Money/Bank",
  8: "Track application status in real-time",
  9: "Receive admission decisions",
  10: "Accept offers and complete enrollment",
};
```

### For Universities

#### Administrative Access

1. **Institution Setup**

   ```
   Admin Portal → Institution Settings
   → Configure admission requirements
   → Set up custom application supplements
   → Define evaluation criteria
   ```

2. **Application Review**
   ```
   Admin Portal → Applications
   → Filter and sort applications
   → Review individual submissions
   → Make admission decisions
   → Send notifications to students
   ```

### API Integration Example

```javascript
// Example API usage for external integrations
const api = {
  baseURL: "https://api.unibridge.gh/v1",

  // Get university list
  async getUniversities() {
    const response = await fetch(`${this.baseURL}/universities`);
    return response.json();
  },

  // Submit application
  async submitApplication(data) {
    const response = await fetch(`${this.baseURL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

## API Documentation

### Core Endpoints

| Method | Endpoint                    | Description                 | Authentication |
| ------ | --------------------------- | --------------------------- | -------------- |
| `GET`  | `/api/v1/universities`      | List all universities       | Public         |
| `POST` | `/api/v1/applications`      | Submit new application      | Required       |
| `GET`  | `/api/v1/applications/{id}` | Get application details     | Required       |
| `GET`  | `/api/v1/scholarships`      | List available scholarships | Public         |
| `POST` | `/api/v1/documents`         | Upload documents            | Required       |

### Authentication

```bash
# Get access token
curl -X POST "https://api.unibridge.gh/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Use token in requests
curl -H "Authorization: Bearer <token>" \
  "https://api.unibridge.gh/v1/applications"
```

## Contributing

We welcome contributions from the community. Please follow these guidelines:

### Development Process

1. **Fork the Repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/unibridgeGhana.git
   cd unibridgeGhana
   git remote add upstream https://github.com/tmarhguy/unibridgeGhana.git
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development Standards**

   - Follow TypeScript/Python type hints
   - Write comprehensive tests
   - Update documentation
   - Follow conventional commit messages

4. **Code Style**

   ```bash
   # Frontend linting
   npm run lint
   npm run format

   # Backend formatting
   black app/
   isort app/
   flake8 app/
   ```

5. **Testing**

   ```bash
   # Frontend tests
   npm run test
   npm run test:e2e

   # Backend tests
   pytest tests/ -v
   ```

6. **Submit Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

### Contribution Areas

- **Frontend Development**: React/Next.js components and features
- **Backend Development**: FastAPI endpoints and database models
- **UI/UX Design**: Interface improvements and user experience
- **Documentation**: Technical documentation and user guides
- **Testing**: Unit tests, integration tests, and E2E tests
- **DevOps**: Infrastructure and deployment improvements

### Issue Reporting

When reporting issues, please include:

- **Environment**: OS, browser, version
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: Visual evidence if applicable

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

### Project Status

**Academic & Portfolio Project**: This project was created for academic and portfolio purposes. While fully functional, it is not intended for production or official deployment without further review and development.

### License Summary

- **Open Source**: Free to use, modify, and distribute under MIT License terms
- **Commercial Use**: Permitted without restrictions
- **Educational Use**: Encouraged for learning and academic purposes
- **Attribution**: Copyright notice and license terms must be included in redistributions
- **No Warranty**: Provided "AS IS" without warranty of any kind

### Key Points

- **Perfect for Learning**: Ideal for students and developers learning modern web development
- **Portfolio Showcase**: Demonstrates full-stack development capabilities
- **Educational Priority**: Special focus on African educational technology solutions
- **Open Development**: All code is open source and available for study

```
MIT License

Copyright (c) 2025 Tyrone Marhguy

Academic and portfolio project - not intended for production deployment.
```

## Credits

### Development Team

- **Lead Developer**: [Tyrone Marhguy](https://github.com/tmarhguy)
- **Contributors**: See [CONTRIBUTORS.md](CONTRIBUTORS.md) for full list

### Acknowledgments

- **Ghana Education Service**: For guidance on educational requirements
- **University Partners**: Public and private institutions across Ghana
- **Open Source Community**: For the amazing tools and libraries
- **Beta Testers**: Students and educators who provided invaluable feedback

### Built For Ghana's Educational Ecosystem

UniBridge Ghana is designed specifically for the Ghanaian educational landscape, incorporating:

- **WASSCE Integration**: Direct support for West African Secondary School Certificate Examination
- **Local Payment Systems**: Mobile Money, GCB, and other local banking integrations
- **Regional Coverage**: Support for universities across all 10 regions of Ghana
- **Cultural Sensitivity**: Interface and processes designed for Ghanaian users
- **Accessibility**: Support for multiple languages and varying internet connectivity

---

**UniBridge Ghana** - Connecting Students to Their Future

For support, contact us at [support@unibridge.gh](mailto:support@unibridge.gh) or visit our [documentation](https://docs.unibridge.gh).
