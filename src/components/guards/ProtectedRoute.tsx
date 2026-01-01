import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useIsAuthenticated, useIsInitialized, useIsAuthLoading } from '../../store/authStore';
import { LoadingScreen } from '../ui';

const ProtectedRoute = () => {
	const isAuthenticated = useIsAuthenticated();
	const isInitialized = useIsInitialized();
	const isLoading = useIsAuthLoading();
	const location = useLocation();

	// Auth kontrolü henüz tamamlanmadıysa loading göster
	if (!isInitialized || isLoading) {
		return <LoadingScreen />;
	}

	if (!isAuthenticated) {
		// Redirect to sign-in, but save the attempted location
		return <Navigate to="/sign-in" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
