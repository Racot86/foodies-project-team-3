import { useDispatch, useSelector } from 'react-redux';

/**
 * A typed version of the `useDispatch` hook.
 * @returns {import('./store').AppDispatch}
 */
export const useAppDispatch = () => useDispatch();

/**
 * A typed version of the `useSelector` hook.
 * @template T
 * @param {(state: import('./store').RootState) => T} selector
 * @returns {T}
 */
export const useAppSelector = useSelector;
