import { Formik, Form } from "formik";
import RecipeSchema from "./recipeSchema";
import { ImageUpload } from "../imgLoader/imgLoader";
import { Input } from "@/components/ui/Input";
import { Button, FieldInput, FieldTextarea } from "@/components/ui";

const RecipeForm = () => {
  const initialValues = {
    image: null,
    ingredient: "",
    quantity: "",
    cookingTime: 20,
    preparation: "",
    description: "",
  };

  const onSubmit = (values) => {
    console.log("Form submitted", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RecipeSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <ImageUpload
            onImageChange={(file) => {
              setFieldValue("image", file);
            }}
          />

          <div>
            <FieldInput
              name="name"
              placeholder="THE NAME OF THE RECIPE"
              required
            />
            <FieldTextarea
              name="description"
              placeholder="Enter a description of the dish"
              maxLength={200}
              expandAt={60}
              required
            />
          </div>
          <Button>Publish</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
