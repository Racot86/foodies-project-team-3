import api from "./api";

export const myRecipeService = async () => {
  return api.get("/recipes/myrecipes");
};
