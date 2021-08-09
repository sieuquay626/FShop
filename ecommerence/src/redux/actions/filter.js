import types from './types';

const resetFilter = () => ({
  type: types.RESET_FILTER
});

const applyFilter = filters => ({
  type: types.APPLY_FILTER,
  payload: filters
});

export { resetFilter, applyFilter };
