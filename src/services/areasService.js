import api from "./api";

export const areasService = async () => {
  try {
    const data = await api.get("/areas");
    return data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};
