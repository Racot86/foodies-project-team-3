export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const buildApiUrl = (path = "") => `${API_BASE_URL}${path}`;

export const withApiBase = (path = "") => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path}`;
};
