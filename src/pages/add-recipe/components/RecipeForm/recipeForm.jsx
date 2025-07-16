import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RecipeSchema from "./recipeSchema.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { postRecipe } from "@redux/slices/addRecipeSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonIcon,
  FieldCount,
  FieldInput,
  FieldTextarea,
} from "@/components/ui";
import { FieldSelect } from "@/components/ui/Fields/FieldSelect/FieldSelect";
import IngredientItem from "@/pages/add-recipe/components/IngredientItem/IngredientItem.jsx";
import { FiPlus, FiTrash } from "react-icons/fi";
import { ImageUpload } from "../ImageUpload/ImageUpload.jsx";
import { areasService } from "@services/areasService.js";
import { categoriesService } from "@services/categoriesService.js";
import { ingredientsService } from "@services/ingredientsService.js";

import styles from "./recipeForm.module.css";

const RecipeForm = () => {
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [image, setImage] = useState(null);
  const [touchedCookingTime, setTouchedCookingTime] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    },
    resolver: yupResolver(RecipeSchema),
  });

  const dispatch = useDispatch();

  const selectedIngredient = watch("ingredient");

  const isAddButtonDisabled =
    selectedIngredient === undefined ||
    selectedIngredient === null ||
    selectedIngredient === "";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    areasService().then(setAreas).catch(console.error);
    categoriesService().then(setCategories).catch(console.error);
    ingredientsService().then(setIngredientsList).catch(console.error);
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.name);
      formData.append("category", data.category);
      formData.append("area", data.area);
      formData.append("instructions", data.preparation);
      formData.append("description", data.description);
      formData.append("time", data.cookingTime.toString());

      if (data.image) {
        formData.append("image", data.image);
      }

      data.ingredients.forEach((ingredient, index) => {
        if (ingredient.id && ingredient.quantity) {
          formData.append(`ingredients[${index}][id]`, ingredient.id);
          formData.append(
            `ingredients[${index}][measure]`,
            ingredient.quantity
          );
        }
      });

      await dispatch(postRecipe(formData)).unwrap();

      toast.dismiss();
      toast.success(
        "Recipe submitted successfully! Redirecting to your profile..."
      );
      reset();
      setImage(null);
      setTimeout(() => {
        navigate("/profile/me");
      }, 2500);
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to submit recipe: ${error.message || error}`);
    }
  };

  const addIngredient = async () => {
    const selectedId = getValues("ingredient");
    const quantity = getValues("quantity");

    setTouchedFields((prev) => ({ ...prev, quantity: true }));
    setValue("ingredient", selectedId);
    setValue("quantity", quantity);

    const isValid = await trigger(["ingredient", "quantity"]);
    if (!isValid) return;

    const currentIngredients = getValues("ingredients");
    if (
      currentIngredients.some((item) => String(item.id) === String(selectedId))
    ) {
      toast.error(
        `The selected ingredient has already been added to the list.`
      );
      return;
    }

    const found = ingredientsList.find(
      (ing) => String(ing.id) === String(selectedId)
    );
    if (!found) return;

    append({
      id: found.id,
      name: found.name,
      image: found.img,
      quantity,
    });

    setValue("ingredient", "");
    setValue("quantity", "");
    setTouchedFields((prev) => ({ ...prev, quantity: false }));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload
          image={image}
          error={errors.image?.message}
          onImageChange={async (file) => {
            setImage(file);
            setValue("image", file);
            await trigger("image");
          }}
        />
        <div className={styles.formWrap}>
          <div className={styles.rightBlock}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FieldInput
                  {...field}
                  placeholder="THE NAME OF THE RECIPE"
                  error={errors.name?.message}
                  className={
                    errors.name ? "nameRecipeError" : "nameRecipeInput"
                  }
                />
              )}
            />

            <div className={styles.infoWrap}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <FieldTextarea
                    {...field}
                    className="recipeDescrInput"
                    placeholder="Enter a description of the dish"
                    maxLength={200}
                    expandAt={60}
                    error={errors.description?.message}
                  />
                )}
              />

              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <FieldSelect
                    {...field}
                    label="Area"
                    className="recipeWrapLabel"
                    placeholder="Select an area"
                    options={areas.map((area) => ({
                      value: area.name,
                      label: area.name,
                    }))}
                    error={errors.area?.message}
                  />
                )}
              />

              <div className={styles.flexRow}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FieldSelect
                      {...field}
                      label="Category"
                      className="recipeWrapLabel"
                      placeholder="Select a category"
                      options={categories.map((cat) => ({
                        value: cat.name,
                        label: cat.name,
                      }))}
                      error={errors.category?.message}
                    />
                  )}
                />

                <Controller
                  name="cookingTime"
                  control={control}
                  render={({ field }) => (
                    <FieldCount
                      {...field}
                      label="Cooking Time"
                      strong
                      step={10}
                      error={errors.cookingTime?.message}
                      className="recipeWrapLabel"
                      isInitial={!touchedCookingTime && field.value === 10}
                      onChange={(val) => {
                        field.onChange(val);
                        if (!touchedCookingTime) setTouchedCookingTime(true);
                      }}
                    />
                  )}
                />
              </div>
              <div className={styles.addWrap}>
                <div
                  className={`${styles.flexRow} ${
                    errors.ingredients
                      ? styles.flexRowQuantityValid
                      : styles.flexRowQuantity
                  } `}
                >
                  <Controller
                    name="ingredient"
                    control={control}
                    render={({ field }) => (
                      <FieldSelect
                        {...field}
                        label="Ingredients"
                        placeholder="Add the ingredient"
                        className="recipeWrapLabel"
                        error={errors.ingredients?.message}
                        options={ingredientsList.map((ing) => ({
                          value: ing.id,
                          label: ing.name,
                        }))}
                      />
                    )}
                  />

                  <FieldInput
                    {...register("quantity")}
                    placeholder="Enter quantity"
                    error={
                      touchedFields.quantity && errors.quantity?.message
                        ? errors.quantity.message
                        : undefined
                    }
                    className="quantityField"
                  />
                </div>

                <Button
                  variant={Button.variants.SECONDARY}
                  onClick={addIngredient}
                  type="button"
                  disabled={isAddButtonDisabled}
                  className="addIngredientBtn"
                >
                  ADD INGREDIENT
                  <FiPlus />
                </Button>

                {fields.length > 0 && (
                  <ul className={styles.ingredientsList}>
                    {fields.map((item, index) => (
                      <IngredientItem
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        quantity={item.quantity}
                        onRemove={() => remove(index)}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <Controller
              name="preparation"
              control={control}
              render={({ field }) => (
                <FieldTextarea
                  {...field}
                  label="Recipe Preparation"
                  className="recipeDescrInput preparationWrap"
                  placeholder="Enter recipe"
                  maxLength={200}
                  expandAt={60}
                  error={errors.preparation?.message}
                />
              )}
            />

            <div className={styles.buttonsRow}>
              <ButtonIcon
                className="recipeTrash"
                variant={Button.variants.SECONDARY}
                onClick={() => {
                  reset();
                  setImage(null);
                  setTouchedCookingTime(false);
                  setTouchedFields({});
                }}
              >
                <FiTrash />
              </ButtonIcon>

              <Button
                className="publishBtn"
                variant={Button.variants.PRIMARY}
                type="submit"
              >
                PUBLISH
              </Button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RecipeForm;
