import types from '../actions/types';

const initialState = {
  listToCartProduct: []
};
const cartReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_TO_CART: {
      let temp = [...state.listToCartProduct];

      let { product, amount = 1, colorSeclected = '' } = action.data;

      if (!temp.length) {
        temp.push({ product, amount, colorSeclected });
      } else {
        let hascart = false;
        temp.forEach(item => {
          if (item.product._id === product._id) {
            item.amount += amount;
            if (colorSeclected) {
              item.colorSeclected = colorSeclected;
            }
            hascart = true;
          }
        });
        if (!hascart) {
          temp.push({ product, amount, colorSeclected });
        }
      }
      return {
        ...state,
        listToCartProduct: temp
      };
    }
    case types.MINUS_TO_CART: {
      let temp = [...state.listToCartProduct];
      let { product } = action.data;
      temp.forEach(item => {
        if (item.product._id === product._id) {
          if (item.amount > 1) {
            item.amount -= 1;
          }
        }
      });
      return {
        ...state,
        listToCartProduct: temp
      };
    }
    case types.DELETE_TO_CART: {
      let temp = [...state.listToCartProduct];
      let { product } = action.data;
      // console.log('delete');
      temp = temp.filter(item => {
        if (item.product._id !== product._id) {
          return true;
        } else {
          return false;
        }
      });
      return {
        ...state,
        listToCartProduct: temp
      };
    }
    case types.CLEAR_CART: {
      return {
        listToCartProduct: []
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
