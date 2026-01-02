# Financial Track Dashboard

A modern financial tracking dashboard built with React, TypeScript, and Vite. Features authentication, real-time financial summaries, transaction history, working capital charts, wallet management, and scheduled transfers.

## 🚀 Features

- **Authentication System**
    - User registration and login
    - JWT token-based authentication
    - Automatic token refresh mechanism
    - Protected routes with route guards

- **Dashboard**
    - Financial summary cards (Total Balance, Total Spending, Total Savings)
    - Working Capital chart with income/expense trends
    - Recent transactions table
    - Wallet cards display
    - Scheduled transfers list

- **User Experience**
    - Responsive design (mobile-first approach)
    - Loading states with shimmer animations
    - Error boundaries and error handling
    - Toast notifications for user feedback
    - 404 Not Found page

- **Developer Experience**
    - TypeScript for type safety
    - SCSS for styling with design tokens
    - Component-level error boundaries
    - Centralized API client with interceptors
    - Path aliases for cleaner imports

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **UI Components:** Radix UI Themes
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Styling:** SCSS
- **Notifications:** React Hot Toast

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd financial_track
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://case.nodelabs.dev
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── api/              # API client and services
├── assets/           # Static assets (images, icons)
├── components/       # Reusable components
│   ├── cards/       # Card components
│   ├── ErrorBoundary/ # Error boundary components
│   ├── guards/      # Route guards
│   └── ui/          # UI components
├── layouts/         # Layout components
│   ├── AuthLayout/  # Authentication layout
│   └── DashboardLayout/ # Dashboard layout
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard pages
│   └── NotFound/    # 404 page
├── providers/       # Context providers
├── router/          # Route configuration
├── store/           # Zustand stores
├── styles/          # Global styles
│   ├── _animations.scss
│   ├── _breakpoints.scss
│   ├── _index.scss
│   ├── reset.scss
│   └── variables.scss
└── utils/           # Utility functions
```

## 🎨 Styling

The project uses SCSS with a design token system:

- **Variables:** Colors, typography, spacing, breakpoints defined in `variables.scss`
- **Breakpoints:** Mobile-first responsive mixins
- **Animations:** Reusable animation mixins (shimmer, pulse)
- **Reset:** Meyer Web CSS Reset

## 🔐 Authentication Flow

1. User signs in/up → Receives access token and refresh token
2. Tokens stored in Zustand store (persisted to localStorage)
3. Axios interceptor adds access token to requests
4. On 401 errors, interceptor automatically refreshes token
5. Token validation on app startup via `/users/profile` endpoint

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🌐 API Integration

The project integrates with a REST API. API services are organized in:

- `api/client.ts` - Axios instance with interceptors
- `api/services/auth.ts` - Authentication endpoints
- `api/services/financial.ts` - Financial data endpoints

All API responses follow the `ApiResponse<T>` wrapper format:

```typescript
{
	success: boolean;
	message: string;
	data: T;
}
```

## 🚢 Deployment

The project is configured for deployment on Vite-compatible platforms (Vercel, Netlify, etc.).

For SPA routing, ensure your hosting platform redirects all routes to `index.html` (configured in `vercel.json`).

## 📄 License

This project is private and proprietary.
