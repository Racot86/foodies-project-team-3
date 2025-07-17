import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAreas } from '@/redux/slices/areasSlice';
import { FieldSelect } from '../FieldSelect/FieldSelect';

export const AreaSelect = ({ onChange, value, ...props }) => {
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
      {...props}
    />
  );
};
