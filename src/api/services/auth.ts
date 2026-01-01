import apiClient from '../client';
import { useAuthStore } from '../../store/authStore';
import type {
	RegisterRequest,
	LoginRequest,
	AuthResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	User,
	ApiResponse,
} from '../types';

// Helper to get auth actions outside of React
const getAuthActions = () => useAuthStore.getState();

export const authService = {
	register: async (data: RegisterRequest): Promise<AuthResponse> => {
		const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/register', data);
		const { accessToken, refreshToken, user } = response.data.data;
		getAuthActions().setAuth(user, accessToken, refreshToken ?? '');
		return response.data.data;
	},

	login: async (data: LoginRequest): Promise<AuthResponse> => {
		const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/login', data);
		const { accessToken, refreshToken, user } = response.data.data;
		getAuthActions().setAuth(user, accessToken, refreshToken ?? '');
		return response.data.data;
	},

	logout: async (): Promise<void> => {
		try {
			await apiClient.post('/users/logout');
		} finally {
			getAuthActions().logout();
		}
	},

	refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
		const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
			'/users/refresh-token',
			data
		);
		const { accessToken } = response.data.data;
		const { user, setAuth } = getAuthActions();
		if (user) {
			setAuth(user, accessToken, '');
		}
		return response.data.data;
	},

	getProfile: async (): Promise<User> => {
		const response = await apiClient.get<ApiResponse<User>>('/users/profile');
		getAuthActions().setUser(response.data.data);
		return response.data.data;
	},
};

export default authService;
