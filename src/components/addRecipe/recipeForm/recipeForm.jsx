import { Formik, Form } from "formik";
import RecipeSchema from "./recipeSchema";
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

import { useEffect, useState } from "react";

const RecipeForm = () => {
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    areasService()
      .then((data) => {
        setAreas(data);
      })
      .catch((error) => {
        console.error("Failed to load areas", error);
      });
  }, []);

  useEffect(() => {
    categoriesService()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to load categories", error);
      });
  }, []);

  useEffect(() => {
    ingredientsService()
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => {
        console.error("Failed to load ingredients", error);
      });
  }, []);

  const initialValues = {
    image: null,
    name: "",
    ingredient: "",
    quantity: "",
    cookingTime: 20,
    preparation: "",
    description: "",
    category: "",
    area: "",
    ingredients: [],
  };

  const addIngredient = (formik) => {
    const { ingredient, quantity, ingredients } = formik.values;

    if (!ingredient || !quantity) return;

    const updated = [...ingredients, { ingredient, quantity }];
    formik.setFieldValue("ingredients", updated);
    formik.setFieldValue("ingredient", "");
    formik.setFieldValue("quantity", "");
  };

  const removeLastIngredient = (formik) => {
    const updated = [...formik.values.ingredients];
    updated.pop();
    formik.setFieldValue("ingredients", updated);
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
      {(formik) => {
        const { setFieldValue, values } = formik;

        return (
          <Form className={styles.formWrap}>
            <ImageUpload
              onImageChange={(file) => {
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
                  }}
                />

                <FieldSelect
                  name="area"
                  label="Area"
                  placeholder="Select an area"
                  options={areas.map((area) => ({
                    value: area.id,
                    label: area.name,
                  }))}
                  value={values.area}
                  onChange={(value) => setFieldValue("area", value)}
                />

                <div className={styles.flexRow}>
                  <FieldSelect
                    name="category"
                    label="Category"
                    placeholder="Select a category"
                    options={categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    value={values.category}
                    onChange={(value) => setFieldValue("category", value)}
                  />
                  <FieldCount
                    label="Cooking Time"
                    name="cookingTime"
                    strong
                    onChange={(value) => setFieldValue("cookingTime", value)}
                    step={10}
                  />
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
                      <li key={index}>
                        {item.ingredient} — {item.quantity}
                      </li>
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
