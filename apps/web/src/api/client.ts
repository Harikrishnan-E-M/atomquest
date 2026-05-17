import axios from 'axios';

export const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export const apiClient = axios.create({
	baseURL: apiBaseUrl,
	withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('atomquest_token');
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
