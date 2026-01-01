import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../api/types';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	isInitialized: boolean; // Auth kontrolü tamamlandı mı?
	isLoading: boolean; // Auth kontrolü yapılıyor mu?
	isLoggingOut: boolean; // Logout işlemi devam ediyor mu?
}

interface AuthActions {
	setAuth: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
	setUser: (user: User) => void;
	setInitialized: (initialized: boolean) => void;
	setLoading: (loading: boolean) => void;
	setLoggingOut: (loggingOut: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null,
	isInitialized: false,
	isLoading: true,
	isLoggingOut: false,
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			...initialState,

			setAuth: (user, accessToken, refreshToken) =>
				set({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					isLoggingOut: false, // Reset logout state on successful login/register
				}),

			logout: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
					isLoggingOut: false, // Reset logout state
				}),

			setUser: (user) => set({ user }),

			setInitialized: (initialized) => set({ isInitialized: initialized }),

			setLoading: (loading) => set({ isLoading: loading }),

			setLoggingOut: (loggingOut) => set({ isLoggingOut: loggingOut }),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

// Selector hooks for better performance
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useUser = () => useAuthStore((state) => state.user);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useIsInitialized = () => useAuthStore((state) => state.isInitialized);
export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading);
