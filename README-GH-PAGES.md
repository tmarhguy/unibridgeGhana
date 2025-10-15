# UniBridge Ghana - GitHub Pages Deployment

This is the GitHub Pages version of UniBridge Ghana, a centralized university admissions platform for Ghana. This version has been configured for static hosting and showcases the frontend interface with mock data.

## 🌐 Live Demo

**Visit the live site**: https://tmarhguy.github.io/unibridgeGhana/

## 📋 Project Overview

UniBridge Ghana eliminates traditional barriers in university applications by providing a centralized platform where students can complete one comprehensive application and apply to multiple institutions simultaneously. This GitHub Pages version demonstrates the platform's user interface and user experience.

## ✨ Features Showcased

### Student Features
- **Unified Application Process**: Single application form for multiple universities
- **University Discovery**: Search and filter universities by programs, location, and requirements
- **Progress Tracking**: Real-time application status monitoring
- **Document Management**: Secure document upload interface
- **Scholarship Integration**: Comprehensive financial aid search
- **Mobile Responsive**: Full functionality across all devices

### Interface Highlights
- **Modern UI**: Clean, professional design inspired by CommonApp
- **Interactive Dashboard**: Comprehensive student dashboard with progress tracking
- **Application Forms**: Dynamic forms that adapt to different institution requirements
- **University Profiles**: Detailed university information and requirements
- **Scholarship Search**: Advanced filtering and application tracking

## 🛠 Technology Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Hook Form** for form management
- **Static Site Generation** for GitHub Pages

### Deployment
- **GitHub Pages** for hosting
- **GitHub Actions** for automated deployment
- **Static Export** for optimal performance

## 🚀 Local Development

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/tmarhguy/unibridgeGhana.git
   cd unibridgeGhana
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build:static
   ```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
unibridgeGhana/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── frontend/                   # Next.js frontend application
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   ├── contexts/          # React contexts
│   │   └── data/              # Mock data for static site
│   ├── public/                # Static assets
│   ├── next.config.js         # Next.js configuration
│   └── package.json           # Dependencies and scripts
└── README-GH-PAGES.md         # This file
```

## 🔧 Configuration Details

### Static Export Configuration
The project is configured for static site generation with:
- `output: 'export'` in Next.js config
- Optimized for GitHub Pages subpath (`/unibridgeGhana/`)
- Unoptimized images for static hosting
- Trailing slashes for proper routing

### Mock Data System
Since GitHub Pages only supports static hosting, the application uses:
- Mock authentication (demo login with any credentials)
- Static university data
- Simulated application progress
- Sample notifications and scholarships

## 🎯 Demo Credentials

For testing the application:
- **Email**: Any valid email format (e.g., `demo@example.com`)
- **Password**: Any password
- The authentication is bypassed for demo purposes

## 📱 Pages and Features

### Core Pages
- **Landing Page**: Introduction and call-to-action
- **Login/Register**: Authentication interface
- **Dashboard**: Student overview and progress tracking
- **University Search**: Browse and filter universities
- **Application Form**: Comprehensive application process
- **Scholarship Search**: Financial aid opportunities
- **Profile Management**: Student profile setup

### Interactive Features
- **Application Progress**: Visual progress tracking
- **Document Upload**: File management interface
- **University Profiles**: Detailed institution information
- **Scholarship Applications**: Financial aid application process
- **Notifications**: Real-time alerts and updates

## 🚀 Deployment Process

The site is automatically deployed using GitHub Actions:

1. **Push to main branch** triggers deployment
2. **GitHub Actions** builds the static site
3. **Deploys to GitHub Pages** automatically
4. **Available at** `https://tmarhguy.github.io/unibridgeGhana/`

### Manual Deployment
```bash
# Build static site
npm run build:static

# The dist/ folder contains the deployable files
```

## 🎨 Design Philosophy

The interface follows a professional, clean design inspired by CommonApp.org:
- **Accessibility**: WCAG 2.1 AA compliant components
- **Responsive**: Mobile-first design approach
- **Performance**: Optimized for fast loading
- **User Experience**: Intuitive navigation and workflows

## 📊 Sample Data

The demo includes realistic data for:
- **100+ Universities**: Major Ghanaian institutions
- **Application Statuses**: Various stages of the application process
- **Scholarships**: Real-world financial aid opportunities
- **Notifications**: Typical student communications

## 🔮 Future Enhancements

While this is a static demo, the full version would include:
- **Backend Integration**: FastAPI with PostgreSQL
- **Real Authentication**: JWT-based security
- **Payment Processing**: Mobile Money and bank integration
- **Document Storage**: Secure file management
- **Real-time Updates**: Live application status tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is an academic and portfolio project. Contributions are welcome for:
- UI/UX improvements
- Additional mock data
- Component enhancements
- Documentation updates

## 📞 Contact

For questions or feedback about this demo:
- **GitHub**: [@tmarhguy](https://github.com/tmarhguy)
- **Email**: Contact through GitHub profile

---

**UniBridge Ghana** - Connecting Students to Their Future

*This GitHub Pages version demonstrates the platform's potential for revolutionizing university admissions in Ghana.*
