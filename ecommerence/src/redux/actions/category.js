import types from './types';

const handleCategory = () => ({
  type: types.GET_LIST_CATEGORIES
});

const handleCategorySuccess = data => ({
  type: types.GET_LIST_CATEGORIES_SUCCESS,
  data
});

const handleCategoryError = () => ({
  type: types.GET_LIST_CATEGORIES_FAILED
});

export { handleCategory, handleCategorySuccess, handleCategoryError };
