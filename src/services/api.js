import axios from "axios";

export const BASE_URL = "https://project-team-3-backend-2.onrender.com/api";
export const DEFAULT_AVATAR = "/default-avatar.jpg";
export const DEFAULT_RECIPE_IMAGE = "/default-recipe-image.jpg";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// API endpoints
/**
 * Fetches testimonials from the backend
 * @returns {Promise<Array<{username: string, testimonial: string}>>} Array of testimonial objects
 */
export const getTestimonials = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/testimonials`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw new Error(
            error.response?.data?.message ||
            "An error occurred while fetching testimonials"
        );
    }
};

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
    (config) => {
        let token = null;
        const foodiesData = localStorage.getItem("foodies");
        if (foodiesData) {
            try {
                const parsedData = JSON.parse(foodiesData);
                token = parsedData.token || null;
            } catch (error) {
                console.error("Error parsing foodies data from localStorage:", error);
            }
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage = error.response?.data?.message || "An error occurred";

        // If it's a 401 error from the /users/current endpoint, it means the user is not authenticated
        if (
            error.response?.status === 401 &&
            error.config?.url?.includes("/users/current")
        ) {
            // We'll still reject the promise, but with a specific message that indicates unauthenticated status
            return Promise.reject(new Error("Not authenticated"));
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
