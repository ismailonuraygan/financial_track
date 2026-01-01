import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useIsAuthenticated, useIsInitialized, useIsAuthLoading } from '../../store/authStore';
import { LoadingScreen } from '../ui';

interface LocationState {
	from?: {
		pathname: string;
	};
}

const GuestRoute = () => {
	const isAuthenticated = useIsAuthenticated();
	const isInitialized = useIsInitialized();
	const isLoading = useIsAuthLoading();
	const location = useLocation();
	const state = location.state as LocationState;

	// Auth kontrolü henüz tamamlanmadıysa loading göster
	if (!isInitialized || isLoading) {
		return <LoadingScreen />;
	}

	if (isAuthenticated) {
		// Redirect to the page they tried to visit, or dashboard
		const destination = state?.from?.pathname || '/dashboard';
		return <Navigate to={destination} replace />;
	}

	return <Outlet />;
};

export default GuestRoute;
