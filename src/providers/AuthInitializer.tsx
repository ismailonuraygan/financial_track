import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';

interface AuthInitializerProps {
	children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
	const { accessToken, setUser, logout, setInitialized, setLoading, isInitialized } =
		useAuthStore();

	useEffect(() => {
		const validateToken = async () => {
			if (!accessToken) {
				setLoading(false);
				setInitialized(true);
				return;
			}

			try {
				const response = await apiClient.get('/users/profile');
				setUser(response.data.data);
				setLoading(false);
				setInitialized(true);
			} catch {
				logout();
				setLoading(false);
				setInitialized(true);
			}
		};

		if (!isInitialized) {
			validateToken();
		}
	}, [accessToken, setUser, logout, setInitialized, setLoading, isInitialized]);

	return <>{children}</>;
};

export default AuthInitializer;
