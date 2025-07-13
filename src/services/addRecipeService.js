import api from "./api";

export const addRecipeService = async (formData) => {
  return api.post("/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
