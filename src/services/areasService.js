import api from "./api";

export const areasService = async () => {
  try {
    /** @type {Array<{_id: string, name: string}>} */
    const data = await api.get("/areas");
    return data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};
