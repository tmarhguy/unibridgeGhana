# GitHub Pages Deployment Guide

This guide explains how to deploy UniBridge Ghana to GitHub Pages.

## 🚀 Quick Start

### 1. Repository Setup
Ensure your repository is public and you have push access to the `main` branch.

### 2. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"

### 3. Deploy
Simply push your changes to the `main` branch. The GitHub Actions workflow will automatically:
- Build the static site
- Deploy to GitHub Pages
- Make it available at `https://tmarhguy.github.io/unibridgeGhana/`

## 📁 Project Structure After Reorganization

```
unibridgeGhana/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Actions deployment
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/              # Pages and layouts
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   └── data/             # Mock data
│   ├── public/               # Static assets
│   ├── next.config.js        # Next.js config for static export
│   └── package.json          # Dependencies
├── backend-backup/           # Backend files (backed up)
│   ├── backend/
│   ├── docker-compose.yml
│   └── infrastructure/
├── setup-gh-pages.sh         # Setup script
├── README.md                 # Main documentation
├── README-GH-PAGES.md        # GitHub Pages specific docs
└── DEPLOYMENT.md             # This file
```

## 🔧 Configuration Details

### Next.js Configuration
The `next.config.js` is configured for static export:
- `output: 'export'` - Enables static site generation
- `basePath: '/unibridgeGhana'` - Configures for GitHub Pages subpath
- `assetPrefix: '/unibridgeGhana'` - Ensures assets load correctly
- `images: { unoptimized: true }` - Required for static hosting

### GitHub Actions Workflow
The `.github/workflows/pages.yml` workflow:
1. Checks out the repository
2. Sets up Node.js and installs dependencies
3. Builds the static site using `npm run build:static`
4. Deploys to GitHub Pages

## 🎯 Demo Features

The GitHub Pages version includes:
- **Mock Authentication**: Any email/password combination works
- **Sample Universities**: Realistic university data
- **Application Tracking**: Simulated application progress
- **Scholarship Search**: Sample financial aid opportunities
- **Responsive Design**: Works on all devices

## 🛠 Local Development

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/tmarhguy/unibridgeGhana.git
cd unibridgeGhana

# Run the setup script
./setup-gh-pages.sh

# Or manually:
cd frontend
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:static` - Build for static export
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔍 Troubleshooting

### Common Issues

1. **Assets not loading**
   - Ensure `basePath` and `assetPrefix` are correctly configured
   - Check that images are in the `public` directory

2. **Routing issues**
   - Verify `trailingSlash: true` in Next.js config
   - Check that all pages export properly

3. **Build failures**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify all imports are correct

### Debug Steps
1. Test locally: `npm run build:static`
2. Check the `dist/` folder contents
3. Verify GitHub Actions logs
4. Check repository Pages settings

## 📊 Performance

The static site is optimized for:
- **Fast Loading**: Minimal JavaScript bundle
- **SEO Friendly**: Static HTML generation
- **CDN Ready**: GitHub Pages CDN distribution
- **Mobile Optimized**: Responsive design

## 🔄 Updates

To update the deployed site:
1. Make your changes
2. Push to the `main` branch
3. GitHub Actions will automatically rebuild and deploy
4. Changes are live within minutes

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all files are committed
4. Contact through GitHub issues

---

**UniBridge Ghana** - Connecting Students to Their Future
