import { combineReducers } from 'redux';
import auth from './authReducer';
import product from './productReducer';
import cart from './cartReducer';
import category from './categoryReducer';
import brand from './brandReducer';
import order from './orderReducer';
import filter from './filterReducer';
export default combineReducers({
  auth,
  cart,
  product,
  category,
  brand,
  order,
  filter
});
