// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect, useState } from "react";
// import RecipeSchema from "./recipeSchema";
// import {
//   Button,
//   ButtonIcon,
//   FieldCount,
//   FieldInput,
//   FieldTextarea,
// } from "@/components/ui";
// import { FieldSelect } from "@/components/ui/Fields/FieldSelect/FieldSelect";
// import { ImageUpload } from "../ImageUpload/ImageUpload";
// import IngredientItem from "@components/addRecipe/IngredientItem/IngredientItem.jsx";
// import { FiPlus, FiTrash } from "react-icons/fi";
// import styles from "./RecipeForm.module.css";
// import { areasService } from "@services/areasService";
// import { categoriesService } from "@services/categoriesService";
// import { ingredientsService } from "@services/ingredientsService";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { postRecipe } from "@/redux/slices/addRecipeSlice";

// const AddRecipeForm = () => {
//   const [areas, setAreas] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [ingredientsList, setIngredientsList] = useState([]);
//   const [tempImage, setTempImage] = useState(null);
//   const [addedIngredients, setAddedIngredients] = useState([]);
//   const [ingredientId, setIngredientId] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.recipes);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(RecipeSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "",
//       area: "",
//       instructions: "",
//       cookingTime: 1,
//       image: null,
//     },
//   });

//   useEffect(() => {
//     areasService().then(setAreas);
//     categoriesService().then(setCategories);
//     ingredientsService().then(setIngredientsList);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (tempImage) {
//         URL.revokeObjectURL(tempImage);
//       }
//     };
//   }, [tempImage]);

//   const onImageChange = (file) => {
//     setValue("image", file);
//     setTempImage(URL.createObjectURL(file));
//   };

//   const addIngredient = () => {
//     if (!ingredientId || !quantity) return;
//     const found = ingredientsList.find((i) => i.id === ingredientId);
//     if (!found) return;

//     setAddedIngredients((prev) => [
//       ...prev,
//       { id: found.id, name: found.name, image: found.img, quantity },
//     ]);
//     setIngredientId("");
//     setQuantity("");
//   };

//   const removeIngredient = (index) => {
//     setAddedIngredients((prev) => prev.filter((_, i) => i !== index));
//   };

//   const clearForm = () => {
//     reset();
//     setTempImage(null);
//     setAddedIngredients([]);
//     setIngredientId("");
//     setQuantity("");
//   };

//   const onSubmit = (data) => {
//     if (addedIngredients.length === 0) {
//       alert("Please add at least one ingredient.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("area", data.area);
//     formData.append("instructions", data.instructions);
//     formData.append("time", data.cookingTime.toString());
//     formData.append("image", data.image);
//     formData.append("ingredients", JSON.stringify(addedIngredients));

//     dispatch(postRecipe(formData))
//       .unwrap()
//       .then(() => {
//         navigate("/user");
//         clearForm();
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap}>
//       <ImageUpload onImageChange={onImageChange} preview={tempImage} />

//       <div className={styles.rightBlock}>
//         <FieldInput
//           placeholder="RECIPE NAME"
//           {...register("title")}
//           error={errors.title?.message}
//         />

//         <FieldTextarea
//           placeholder="Short description"
//           maxLength={200}
//           {...register("description")}
//           error={errors.description?.message}
//         />

//         <Controller
//           control={control}
//           name="area"
//           render={({ field }) => (
//             <FieldSelect
//               label="Area"
//               options={areas.map((a) => ({ value: a.id, label: a.name }))}
//               {...field}
//               error={errors.area?.message}
//             />
//           )}
//         />

//         <div className={styles.flexRow}>
//           <Controller
//             control={control}
//             name="category"
//             render={({ field }) => (
//               <FieldSelect
//                 label="Category"
//                 options={categories.map((c) => ({
//                   value: c.id,
//                   label: c.name,
//                 }))}
//                 {...field}
//                 error={errors.category?.message}
//               />
//             )}
//           />

//           <Controller
//             control={control}
//             name="cookingTime"
//             render={({ field }) => (
//               <FieldCount label="Cooking Time" {...field} min={1} />
//             )}
//           />
//         </div>

//         <div className={styles.flexRow}>
//           <FieldSelect
//             label="Ingredients"
//             options={ingredientsList.map((i) => ({
//               value: i.id,
//               label: i.name,
//             }))}
//             value={ingredientId}
//             onChange={(val) => setIngredientId(val)}
//           />
//           <FieldInput
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>

//         <Button type="button" onClick={addIngredient}>
//           ADD INGREDIENT <FiPlus />
//         </Button>

//         {addedIngredients.length > 0 && (
//           <ul className={styles.ingredientsList}>
//             {addedIngredients.map((item, i) => (
//               <IngredientItem
//                 key={i}
//                 name={item.name}
//                 image={item.image}
//                 quantity={item.quantity}
//                 onRemove={() => removeIngredient(i)}
//               />
//             ))}
//           </ul>
//         )}

//         <FieldTextarea
//           label="Recipe Preparation"
//           maxLength={2000}
//           {...register("instructions")}
//           error={errors.instructions?.message}
//         />

//         <div className={styles.buttonsRow}>
//           <ButtonIcon type="button" onClick={clearForm}>
//             <FiTrash />
//           </ButtonIcon>
//           <Button type="submit">PUBLISH</Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddRecipeForm;

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

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values);
    console.log("Image file:", values.image);
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

      console.log(formData);
      const response = await addRecipeService(formData);

      if (!response.ok) {
        throw new Error("Failed to submit recipe");
      }

      const data = await response.json();
      console.log("Recipe submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={RecipeSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { setFieldValue, values, touched, errors } = formik;

        return (
          <Form className={styles.formWrap}>
            <ImageUpload
              onImageChange={(file) => setFieldValue("image", file)}
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
                  marginBottom: "8px",
                }}
              />
              {touched.name && errors.name && (
                <div style={{ color: "red", marginBottom: "16px" }}>
                  {errors.name}
                </div>
              )}

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
                {touched.description && errors.description && (
                  <div style={{ color: "red", marginBottom: "16px" }}>
                    {errors.description}
                  </div>
                )}

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
                      value: category.id,
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
              {touched.preparation && errors.preparation && (
                <div style={{ color: "red", marginBottom: "16px" }}>
                  {errors.preparation}
                </div>
              )}

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
