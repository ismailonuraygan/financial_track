import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = 'https://case.nodelabs.dev/api/';

// Axios instance
export const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Helper to get auth state outside of React
const getAuthState = () => useAuthStore.getState();

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (token: string) => void;
	reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
	failedQueue.forEach((promise) => {
		if (error) {
			promise.reject(error);
		} else {
			promise.resolve(token!);
		}
	});
	failedQueue = [];
};

// Request interceptor - Add access token to headers
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const { accessToken } = getAuthState();
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		// If 401 and not already retrying
		if (error.response?.status === 401 && !originalRequest._retry) {
			// Skip refresh for login/register/refresh-token endpoints
			const skipRefreshPaths = ['/users/login', '/users/register', '/users/refresh-token'];
			if (skipRefreshPaths.some((path) => originalRequest.url?.includes(path))) {
				return Promise.reject(error);
			}

			if (isRefreshing) {
				// Queue the request while refreshing
				return new Promise((resolve, reject) => {
					failedQueue.push({
						resolve: (token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(apiClient(originalRequest));
						},
						reject: (err: AxiosError) => {
							reject(err);
						},
					});
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const { refreshToken, logout, setAuth, user } = getAuthState();

			if (!refreshToken) {
				logout();
				window.location.href = '/sign-in';
				return Promise.reject(error);
			}

			try {
				const response = await axios.post(`${BASE_URL}/users/refresh-token`, {
					refreshToken,
				});

				const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
					response.data;

				// Update auth store
				if (user) {
					setAuth(user, newAccessToken, newRefreshToken);
				}

				processQueue(null, newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return apiClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as AxiosError, null);
				logout();
				window.location.href = '/sign-in';
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
