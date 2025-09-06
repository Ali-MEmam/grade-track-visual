import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "./token-manager";

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10),
  headers: {
    "Content-Type": "application/json",
  },
});

// Queue to hold requests while token is being refreshed
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check if token is expired before making request
    if (tokenManager.isTokenExpired() && tokenManager.hasTokens()) {
      // Token is expired, trigger refresh
      const refreshToken = tokenManager.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await refreshAccessToken(refreshToken);
          tokenManager.updateAccessToken(
            response.data.accessToken,
            response.data.expiresIn
          );
        } catch (error) {
          tokenManager.clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    // Add token to request if available
    const token = tokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if the request is to auth endpoints (login/register)
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register");

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't redirect if it's a login/register attempt
      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        // No refresh token, redirect to login
        tokenManager.clearTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        refreshAccessToken(refreshToken)
          .then((response) => {
            const {
              accessToken,
              refreshToken: newRefreshToken,
              expiresIn,
            } = response.data;

            // Update tokens
            tokenManager.setTokens({
              accessToken,
              refreshToken: newRefreshToken || refreshToken,
              expiresIn,
            });

            // Update authorization header for original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            processQueue(null, accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            tokenManager.clearTokens();
            window.location.href = "/login";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // Handle other error responses
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Access forbidden:", error.response.data);
    } else if (error.response?.status === 404) {
      // Not found
      console.error("Resource not found:", error.response.data);
    } else if (error.response?.status === 500) {
      // Server error
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

// Function to refresh access token
async function refreshAccessToken(refreshToken: string) {
  // Note: This endpoint doesn't use the interceptor to avoid infinite loop
  return axios.post(
    `${
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"
    }/auth/refresh`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// Export configured axios instance
export default axiosInstance;

// Export types for use in other files
export type { AxiosError, AxiosInstance };
