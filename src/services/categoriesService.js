import api from "./api";

export const categoriesService = async () => {
    return api.get("/categories");
};
