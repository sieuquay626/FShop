import types from './types';

const handleAddCart = data => {
  return {
    type: types.ADD_TO_CART,
    data
  };
};

const handleMinusCart = data => {
  return {
    type: types.MINUS_TO_CART,
    data
  };
};

const handleDeleteCart = data => {
  return {
    type: types.DELETE_TO_CART,
    data
  };
};
const handleClearCart = () => {
  return {
    type: types.CLEAR_CART
  };
};
export { handleAddCart, handleClearCart, handleMinusCart, handleDeleteCart };
