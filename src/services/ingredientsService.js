import api from "./api";

export const ingredientsService = async () => {
  try {
    /** @type {Array<{_id: string, name: string}>} */
    const data = await api.get("/ingredients");
    return data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
