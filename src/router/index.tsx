import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';

// Guards
import { GuestRoute, ProtectedRoute } from '../components/guards';

// Error Boundary
import { RouterErrorBoundary } from '../components/ErrorBoundary';

// Auth Pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';

// NotFound Page
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/dashboard" replace />,
		errorElement: <RouterErrorBoundary />,
	},
	{
		// Guest only routes (sign-in, sign-up)
		element: <GuestRoute />,
		errorElement: <RouterErrorBoundary />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{
						path: 'sign-in',
						element: <SignIn />,
					},
					{
						path: 'sign-up',
						element: <SignUp />,
					},
				],
			},
		],
	},
	{
		// Protected routes (dashboard)
		element: <ProtectedRoute />,
		errorElement: <RouterErrorBoundary />,
		children: [
			{
				element: <DashboardLayout />,
				errorElement: <RouterErrorBoundary />,
				children: [
					{
						path: 'dashboard',
						element: <Dashboard />,
						errorElement: <RouterErrorBoundary />,
					},
				],
			},
		],
	},
	{
		// NotFound route - catches all unknown routes
		path: '*',
		element: <NotFound />,
		errorElement: <RouterErrorBoundary />,
	},
]);
