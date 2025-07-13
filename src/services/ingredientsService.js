import api from "./api";

export const ingredientsService = async () => {
  return api.get("/ingredients");
};
