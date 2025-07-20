import * as yup from "yup";

const RecipeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  description: yup
    .string()
    .max(999, "Description must be at most 999 characters")
    .required("Description is required"),

  category: yup.string().required("Category is required"),
  area: yup.string().required("Area is required"),

  preparation: yup
    .string()
    .max(999, "Instructions must be at most 999 characters")
    .required("Instructions are required"),

  cookingTime: yup
    .number()
    .min(10, "Cooking time must be at least 10 minutes")
    .required("Cooking time is required"),

  image: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported image format. Only JPG and PNG are allowed.",
      (value) => {
        if (!value) return false;
        const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
        return supportedFormats.includes(value.type);
      }
    ),

  quantity: yup
    .string()
    .nullable()
    .when("ingredient", {
      is: (val) => val !== undefined && val !== "",
      then: (schema) =>
        schema
          .required("Quantity is required")
          .max(20, "Quantity must be at most 20 characters")
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
          .max(20, "Quantity must be at most 20 characters")
          .matches(/\d/, "Quantity must contain at least one number"),
      })
    )
    .required("At least one ingredient must be listed"),
});

export default RecipeSchema;
