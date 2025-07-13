import { Formik, Form } from "formik";
import RecipeSchema from "./recipeSchema.jsx";
import { ImageUpload } from "../ImageUpload/ImageUpload.jsx";
import {
  Button,
  ButtonIcon,
  FieldCount,
  FieldInput,
  FieldTextarea,
} from "@/components/ui";
import { FieldSelect } from "@/components/ui/Fields/FieldSelect/FieldSelect";

import { FiPlus, FiTrash } from "react-icons/fi";
import styles from "./RecipeForm.module.css";
import { areasService } from "@services/areasService.js";
import { categoriesService } from "@services/categoriesService.js";
import { ingredientsService } from "@services/ingredientsService.js";

import IngredientItem from "@components/addRecipe/IngredientItem/IngredientItem.jsx";

import { useEffect, useState } from "react";
import { addRecipeService } from "@/services/addRecipeService.js";

const RecipeForm = () => {
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null); // стан картинки

  useEffect(() => {
    areasService()
      .then((data) => setAreas(data))
      .catch((error) => console.error("Failed to load areas", error));
  }, []);

  useEffect(() => {
    categoriesService()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to load categories", error));
  }, []);

  useEffect(() => {
    ingredientsService()
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Failed to load ingredients", error));
  }, []);

  const initialValues = {
    image: null,
    name: "",
    ingredient: "",
    quantity: "",
    cookingTime: 10,
    preparation: "",
    description: "",
    category: "",
    area: "",
    ingredients: [],
  };

  const addIngredient = (formik) => {
    const {
      ingredient,
      quantity,
      ingredients: currentIngredients,
    } = formik.values;

    if (!ingredient || !quantity) return;

    const found = ingredients.find((ing) => ing.id === ingredient);
    if (!found) return;

    const updated = [
      ...currentIngredients,
      {
        id: found.id,
        name: found.name,
        image: found.img,
        quantity,
      },
    ];

    formik.setFieldValue("ingredients", updated);
    formik.setFieldValue("ingredient", "");
    formik.setFieldValue("quantity", "");
  };

  const removeLastIngredient = (formik) => {
    const updated = [...formik.values.ingredients];
    updated.pop();
    formik.setFieldValue("ingredients", updated);
  };

  const removeIngredientAtIndex = (formik, indexToRemove) => {
    const updated = formik.values.ingredients.filter(
      (_, i) => i !== indexToRemove
    );
    formik.setFieldValue("ingredients", updated);
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("title", values.name);
      formData.append("category", values.category);
      formData.append("area", values.area);
      formData.append("instructions", values.preparation);
      formData.append("description", values.description);
      formData.append("time", values.cookingTime.toString());
      formData.append("image", values.image);

      values.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][id]`, ingredient.id);
        formData.append(`ingredients[${index}][measure]`, ingredient.quantity);
      });

      const response = await addRecipeService(formData);

      console.log("✅ Recipe submitted successfully:", response.data);

      resetForm({ values: initialValues });
      setImage(null); // очищаємо картинку у стані
    } catch (error) {
      console.error(" Error submitting recipe:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RecipeSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { setFieldValue, values, touched, errors } = formik;

        return (
          <Form className={styles.formWrap}>
            <ImageUpload
              image={image} // передаємо контролювану картинку
              onImageChange={(file) => {
                setImage(file);
                setFieldValue("image", file);
              }}
            />

            <div className={styles.rightBlock}>
              <FieldInput
                name="name"
                placeholder="THE NAME OF THE RECIPE"
                inputStyle={{
                  padding: "0",
                  border: "none",
                  height: "28px",
                  minHeight: "unset",
                  fontWeight: "800",
                  fontSize: "24px",
                  marginBottom: "40px",
                }}
              />

              <div className={styles.infoWrap}>
                <FieldTextarea
                  name="description"
                  placeholder="Enter a description of the dish"
                  maxLength={200}
                  expandAt={60}
                  textareaStyle={{
                    padding: "0",
                    height: "40px",
                    minHeight: "unset",
                    lineHeight: "1.5",
                    marginBottom: "8px",
                  }}
                />

                <FieldSelect
                  name="area"
                  label="Area"
                  placeholder="Select an area"
                  options={areas.map((area) => ({
                    value: area.name,
                    label: area.name,
                  }))}
                  value={values.area}
                  onChange={(value) => setFieldValue("area", value)}
                />
                {touched.area && errors.area && (
                  <div style={{ color: "red", marginBottom: "16px" }}>
                    {errors.area}
                  </div>
                )}

                <div className={styles.flexRow}>
                  <FieldSelect
                    name="category"
                    label="Category"
                    placeholder="Select a category"
                    options={categories.map((category) => ({
                      value: category.name,
                      label: category.name,
                    }))}
                    value={values.category}
                    onChange={(value) => setFieldValue("category", value)}
                  />
                  {touched.category && errors.category && (
                    <div style={{ color: "red", marginBottom: "16px" }}>
                      {errors.category}
                    </div>
                  )}

                  <FieldCount
                    label="Cooking Time"
                    name="cookingTime"
                    strong
                    onChange={(value) => setFieldValue("cookingTime", value)}
                    step={10}
                    style={{ gap: "16px" }}
                  />
                  {touched.cookingTime && errors.cookingTime && (
                    <div style={{ color: "red", marginBottom: "16px" }}>
                      {errors.cookingTime}
                    </div>
                  )}
                </div>

                <div className={styles.flexRow}>
                  <FieldSelect
                    name="ingredient"
                    label="Ingredients"
                    placeholder="Add the ingredient"
                    options={ingredients.map((ingredient) => ({
                      value: ingredient.id,
                      label: ingredient.name,
                    }))}
                    value={values.ingredient}
                    onChange={(value) => setFieldValue("ingredient", value)}
                  />
                  <FieldInput name="quantity" placeholder="Enter quantity" />
                </div>

                <Button
                  variant={Button.variants.SECONDARY}
                  onClick={() => addIngredient(formik)}
                  type="button"
                >
                  ADD INGREDIENT
                  <FiPlus />
                </Button>

                {values.ingredients.length > 0 && (
                  <ul className={styles.ingredientsList}>
                    {values.ingredients.map((item, index) => (
                      <IngredientItem
                        key={index}
                        name={item.name}
                        image={item.image}
                        quantity={item.quantity}
                        onRemove={() => removeIngredientAtIndex(formik, index)}
                      />
                    ))}
                  </ul>
                )}
              </div>

              <FieldTextarea
                name="preparation"
                label="Recipe Preparation"
                placeholder="Enter recipe"
                maxLength={200}
                expandAt={60}
                textareaStyle={{ marginTop: "8px" }}
              />

              <div className={styles.buttonsRow}>
                <ButtonIcon
                  variant={ButtonIcon.variants.PRIMARY}
                  onClick={() => removeLastIngredient(formik)}
                  type="button"
                >
                  <FiTrash />
                </ButtonIcon>

                <Button variant={Button.variants.PRIMARY} type="submit">
                  PUBLISH
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RecipeForm;
