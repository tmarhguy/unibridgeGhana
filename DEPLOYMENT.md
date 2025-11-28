# Deployment Guide

This guide explains how to deploy UniBridge Ghana, including the GitHub Pages frontend demo and the full stack production deployment.

## 🚀 GitHub Pages Deployment (Frontend Demo)

### Quick Start

1.  **Repository Setup**: Ensure your repository is public and you have push access to the `main` branch.
2.  **Enable GitHub Pages**:
    *   Go to your repository settings on GitHub.
    *   Navigate to "Pages" in the left sidebar.
    *   Under "Source", select "GitHub Actions".
3.  **Deploy**:
    *   Push your changes to the `main` branch.
    *   The GitHub Actions workflow (`.github/workflows/pages.yml`) will automatically build and deploy the static site.
    *   Your site will be available at `https://tmarhguy.github.io/unibridgeGhana/`.

### Configuration Details

*   **Next.js Configuration**: `next.config.js` is set to `output: 'export'` for static site generation. `basePath` and `assetPrefix` are configured for the repository name.
*   **Mock Data**: The GitHub Pages version uses mock data (in `src/data`) to simulate backend interactions, as static hosting cannot run the Python backend.
*   **Authentication**: Bypassed for the demo. Any email/password combination works.

### Troubleshooting

*   **Assets not loading**: Check `basePath` and `assetPrefix` in `next.config.js`.
*   **404 Errors**: Ensure `trailingSlash: true` is set if you encounter routing issues.
*   **Build Failures**: Run `npm run build:static` locally to debug.

---

## 🌍 Full Stack Production Deployment

### Prerequisites

*   **Docker** & **Docker Compose**
*   **Domain Name** (for production)
*   **VPS/Cloud Server** (e.g., AWS, DigitalOcean, Heroku)

### Environment Configuration

Create a `.env` file in the `backend` directory (copy from `.env.example`) and configure:

```bash
DATABASE_URL="postgresql://user:password@db:5432/unibridge_prod"
REDIS_URL="redis://redis:6379"
SECRET_KEY="your-secure-secret-key"
ENVIRONMENT="production"
```

### Docker Deployment

1.  **Build and Run**:
    ```bash
    docker-compose up --build -d
    ```

2.  **Run Migrations**:
    ```bash
    docker-compose exec backend alembic upgrade head
    ```

3.  **Verify**:
    *   Frontend: `http://localhost:3000` (or your domain)
    *   Backend API: `http://localhost:8000`
    *   API Docs: `http://localhost:8000/docs`

### Manual Deployment

#### Backend
1.  Install Python 3.11+.
2.  Install dependencies: `pip install -r backend/requirements.txt`.
3.  Run with Uvicorn: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4`.

#### Frontend
1.  Install Node.js 18+.
2.  Install dependencies: `cd frontend && npm install`.
3.  Build: `npm run build`.
4.  Start: `npm start`.

## 📁 Project Structure

```
unibridgeGhana/
├── .github/workflows/pages.yml     # GitHub Actions for Pages
├── backend/                        # FastAPI Backend
├── frontend/                       # Next.js Frontend
├── infrastructure/                 # Infrastructure config (Nginx, etc.)
├── docker-compose.yml              # Docker composition
├── setup-gh-pages.sh               # Setup script for Pages
├── README.md                       # Main documentation
└── DEPLOYMENT.md                   # This file
```
