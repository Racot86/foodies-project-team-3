import * as yup from "yup";

const RecipeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),

  description: yup
    .string()
    .max(200, "Description must be at most 200 characters")
    .required("Description is required"),

  category: yup.string().required("Category is required"),
  area: yup.string().required("Area is required"),

  instructions: yup
    .string()
    .max(200, "Instructions must be at most 200 characters")
    .required("Instructions are required"),

  cookingTime: yup
    .number()
    .min(1, "Cooking time must be at least 1 minute")
    .required("Cooking time is required"),

  image: yup.mixed().required("Image is required"),

  ingredients: yup
    .array()
    .min(1, "At least one ingredient is required")
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        image: yup.string().url().required(),
        quantity: yup.string().required("Quantity is required"),
      })
    ),
});

export default RecipeSchema;
