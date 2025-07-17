import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchAreas } from '@/redux/slices/areasSlice';
import { FieldSelect } from '@/components/ui/Fields/FieldSelect/FieldSelect';

export const AreaSelect = ({ onChange, value, wrapperClassName, selectWrapperClassName, optionsListClassName, selectedValueClassName, ...props }) => {
  const dispatch = useAppDispatch();
  const { data: areas, isLoading } = useAppSelector((state) => state.areas);

  useEffect(() => {
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, areas.length]);

  const options = (areas || []).map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <FieldSelect
      label=""
      name="area"
      options={options}
      placeholder={isLoading ? 'Loading...' : 'Region'}
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
