import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchIngredients } from '@/redux/slices/ingredientsSlice';
import { FieldSelect } from '@/components/ui/Fields/FieldSelect/FieldSelect';

export const IngredientSelect = ({ onChange, value, wrapperClassName, selectWrapperClassName, optionsListClassName, selectedValueClassName, ...props }) => {
  const dispatch = useAppDispatch();
  const { data: ingredients, isLoading } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients({ filter: false }));
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
      error={null}
      required={false}
      className=""
      wrapperClassName={wrapperClassName}
      selectWrapperClassName={selectWrapperClassName}
      optionsListClassName={optionsListClassName}
      selectedValueClassName={selectedValueClassName}
      helperText=""
      {...props}
    />
  );
};
