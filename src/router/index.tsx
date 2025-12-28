import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/sign-in" replace />,
	},
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
	{
		element: <DashboardLayout />,
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />,
			},
		],
	},
]);
