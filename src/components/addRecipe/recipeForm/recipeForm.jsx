import { Formik, Form } from "formik";
import RecipeSchema from "./recipeSchema";
import { ImageUpload } from "../imgLoader/imgLoader";

const RecipeForm = () => {
  const initialValues = {
    image: null,
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
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
