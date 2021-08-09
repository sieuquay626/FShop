import types from './types';

const handlePopularProduct = data => {
  console.log('action handlePopularProduct');
  return {
    type: types.GET_POPULAR_PRODUCTS,
    filter: data
  };
};
const handlePopularProductSuccess = data => {
  return {
    type: types.GET_POPULAR_PRODUCTS_SUCCESS,
    data
  };
};
const handlePopularProductError = error => {
  return {
    type: types.GET_POPULAR_PRODUCTS_FAILED,
    error
  };
};
const handleArrivalProduct = filter => {
  return {
    type: types.GET_ARRIVAL_PRODUCTS,
    filter
  };
};
const handleArrivalProductSuccess = data => {
  return {
    type: types.GET_ARRIVAL_PRODUCTS_SUCCESS,
    data
  };
};
const handleArrivalProductError = error => {
  return {
    type: types.GET_ARRIVAL_PRODUCTS_FAILED,
    error
  };
};
const handleToprateProduct = filter => {
  return {
    type: types.GET_TOP_RATE_PRODUCTS,
    filter
  };
};
const handleToprateProductSuccess = data => {
  return {
    type: types.GET_TOP_RATE_PRODUCTS_SUCCESS,
    data
  };
};
const handleToprateProductError = error => {
  return {
    type: types.GET_TOP_RATE_PRODUCTS_FAILED,
    error
  };
};
const handleGenderProduct = (data, filter) => {
  return {
    type: types.GET_GENDER_PRODUCTS,
    payload: {
      data,
      filter
    }
  };
};
const handleGenderProductSuccess = data => {
  console.log(data);
  return {
    type: types.GET_GENDER_PRODUCTS_SUCCESS,
    data
  };
};
const handleGenderProductError = error => {
  return {
    type: types.GET_GENDER_PRODUCTS_FAILED,
    error
  };
};

export {
  handlePopularProduct,
  handlePopularProductSuccess,
  handlePopularProductError,
  handleArrivalProduct,
  handleArrivalProductSuccess,
  handleArrivalProductError,
  handleToprateProduct,
  handleToprateProductSuccess,
  handleToprateProductError,
  handleGenderProduct,
  handleGenderProductSuccess,
  handleGenderProductError
};
