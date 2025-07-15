import * as yup from "yup";

const RecipeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  description: yup
    .string()
    .max(200, "Description must be at most 200 characters")
    .required("Description is required"),

  category: yup.string().required("Category is required"),
  area: yup.string().required("Area is required"),

  preparation: yup
    .string()
    .max(200, "Instructions must be at most 200 characters")
    .required("Instructions are required"),

  cookingTime: yup
    .number()
    .min(10, "Cooking time must be at least 10 minutes")
    .required("Cooking time is required"),

  image: yup.mixed().required("Image is required"),

  quantity: yup
    .string()
    .nullable()
    .when("ingredient", {
      is: (val) => val !== undefined && val !== "",
      then: (schema) =>
        schema
          .required("Quantity is required")
          .max(10, "Quantity must be at most 10 characters")
          .matches(/\d/, "Quantity must contain at least one number"),
    }),

  ingredient: yup.string().nullable(),

  ingredients: yup
    .array()
    .min(1, "At least one ingredient is required")
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        image: yup.string().url().required(),
        quantity: yup
          .string()
          .required("Quantity is required")
          .max(10, "Quantity must be at most 10 characters")
          .matches(/\d/, "Quantity must contain at least one number"),
      })
    )
    .required("At least one ingredient must be listed"),
});

export default RecipeSchema;
