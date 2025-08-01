# UniBridge Ghana

A modern Next.js 14 application for the UniBridge Ghana university application platform.

## Features Implemented

### 🏠 Core Pages

- **Homepage** - Landing page with features and university showcase
- **Login/Register** - Complete authentication flow
- **Profile Setup** - Multi-step onboarding for new users
- **Dashboard** - Student portal showing applications and universities
- **Universities** - Browse and search available universities
- **Application Form** - Dynamic multi-section application form

### 🎨 UI Components

- **Design System** - Built with Tailwind CSS and Radix UI
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Cards, buttons, inputs, forms with consistent styling
- **Loading States** - Spinner components for better UX

### 🔐 Authentication

- **Auth Context** - React context for user state management
- **Protected Routes** - HOC for route protection
- **Token Management** - Automatic token handling and refresh

### 🌐 API Integration

- **HTTP Client** - Axios-based API client with interceptors
- **Error Handling** - Automatic error handling and token refresh
- **TypeScript** - Fully typed API calls and responses

### 📱 User Experience

- **Progressive Flow** - Guided user journey from signup to application
- **Form Validation** - Client-side validation with error messages
- **File Uploads** - Document upload functionality
- **Search & Filters** - University discovery features

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context + React Query
- **Form Handling**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update the variables in `.env.local`

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── (auth)/            # Auth-related pages
│   ├── dashboard/         # Student dashboard
│   ├── universities/      # University listings
│   ├── apply/             # Application forms
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key User Flows

### 1. Student Registration

1. Homepage → Register
2. Fill registration form
3. Profile setup (4 steps)
4. Dashboard access

### 2. University Application

1. Dashboard → Browse Universities
2. Select university → Apply Now
3. Multi-section form completion
4. Document uploads
5. Application submission

### 3. Application Management

1. Dashboard → View applications
2. Continue drafts
3. Track submission status
4. Download confirmations

## Design System

### Colors

- **Primary**: UniBridge blue (`#1e40af`)
- **Secondary**: Purple (`#7c3aed`)
- **Accent**: Gold (`#f59e0b`)
- **Ghana**: Red, Gold, Green theme colors

### Typography

- **Headings**: Inter font family
- **Body**: System font stack
- **Responsive**: Tailwind's responsive typography

### Components

- **Cards**: Consistent shadow and padding
- **Buttons**: Multiple variants (default, outline, ghost)
- **Forms**: Unified styling with validation states
- **Icons**: Lucide React icon library

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Automatic formatting
- **Imports**: Absolute imports with `@/` prefix

### Component Patterns

- **Functional Components**: Use React hooks
- **TypeScript Props**: Fully typed component props
- **Error Boundaries**: Wrap components for error handling
- **Loading States**: Show loading indicators

### State Management

- **Local State**: useState for component state
- **Global State**: React Context for auth/user data
- **Server State**: React Query for API data
- **Forms**: React Hook Form for complex forms

## Integration Notes

### Backend API

- **Base URL**: Configurable via environment variables
- **Authentication**: JWT tokens with automatic refresh
- **Error Handling**: Consistent error response format
- **File Uploads**: Multipart form data support

### Third-party Services

- **Analytics**: Ready for Google Analytics integration
- **Error Tracking**: Ready for Sentry integration
- **Payments**: Placeholder for payment gateway

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://api.unibridge.gh/api/v1
NEXT_PUBLIC_APP_URL=https://unibridge.gh
```

## Contributing

1. Follow the established code style
2. Write TypeScript types for all new code
3. Add proper error handling
4. Test components before committing
5. Update documentation for new features

## Next Steps

### Phase 1 (Current MVP)

- ✅ User authentication and registration
- ✅ Profile management
- ✅ University browsing
- ✅ Application form system
- ✅ Document uploads

### Phase 2 (Enhancement)

- 🔄 Real-time application status
- 🔄 Email notifications
- 🔄 Payment integration
- 🔄 Advanced search filters
- 🔄 Application analytics

### Phase 3 (Scale)

- 📋 University admin portal
- 📋 Bulk operations
- 📋 Advanced reporting
- 📋 API rate limiting
- 📋 Performance optimization
