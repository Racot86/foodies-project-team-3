import api from "./api";

export const areasService = async () => {
  return api.get("/areas");
};
