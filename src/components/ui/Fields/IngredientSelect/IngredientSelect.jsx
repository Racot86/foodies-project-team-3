import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchIngredients } from '@/redux/slices/ingredientsSlice';
import { FieldSelect } from '@/components/ui/Fields/FieldSelect/FieldSelect';

export const IngredientSelect = ({ onChange, value, ...props }) => {
  const dispatch = useAppDispatch();
  const { data: ingredients, isLoading } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const options = (ingredients || []).map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <FieldSelect
      label=""
      name="ingredient"
      options={options}
      placeholder={isLoading ? 'Loading...' : 'Ingredient'}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};
