import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RecipeSchema from "./recipeSchema.jsx";
import { toast } from "react-toastify";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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

      const response = await dispatch(postRecipe(formData)).unwrap();

      toast.success(
        "Recipe submitted successfully!"
      );
      reset();
      setImage(null);
      setTimeout(() => {
        navigate("/recipe-details/" + response.id);
      }, 2000);
    } catch (error) {
      toast.error(`Failed to submit recipe: ${error.message || error}`);
    } finally {
      setIsSubmitting(false);
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
                    errors.name
                      ? styles.nameRecipeError
                      : styles.nameRecipeInput
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
                    className={styles.recipeDescrInput}
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
                    label={<span className={styles.sectionLabel}>Area</span>}
                    className={styles.recipeWrapLabel}
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
                      label={
                        <span className={styles.sectionLabel}>Category</span>
                      }
                      className={styles.recipeWrapLabel}
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
                      label={
                        <span className={styles.sectionLabel}>
                          Cooking Time
                        </span>
                      }
                      strong
                      step={10}
                      error={errors.cookingTime?.message}
                      className={styles.recipeWrapLabel}
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
                        label={
                          <span className={styles.sectionLabel}>
                            Ingredients
                          </span>
                        }
                        placeholder="Add the ingredient"
                        className={styles.recipeWrapLabel}
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
                    className={styles.quantityField}
                  />
                </div>

                <Button
                  variant={Button.variants.SECONDARY}
                  onClick={addIngredient}
                  type="button"
                  disabled={isAddButtonDisabled}
                  className={styles.addIngredientBtn}
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
                  className={`${styles.recipeDescrInput} ${styles.preparationWrap}`}
                  placeholder="Enter recipe"
                  maxLength={999}
                  expandAt={60}
                  error={errors.preparation?.message}
                />
              )}
            />

            <div className={styles.buttonsRow}>
              <ButtonIcon
                className={styles.recipeTrash}
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
                className={styles.publishBtn}
                variant={Button.variants.PRIMARY}
                type="submit"
                isLoading={isSubmitting}
              >
                PUBLISH
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
