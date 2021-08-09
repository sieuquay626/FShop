import types from './types';

const handleBrand = () => ({
  type: types.GET_LIST_BRANDS
});
const handleBrandSuccess = data => ({
  type: types.GET_LIST_BRANDS_SUCCESS,
  data
});

const handleBrandError = () => ({
  type: types.GET_LIST_BRANDS_FAILED
});

export { handleBrand, handleBrandSuccess, handleBrandError };
