import types from '../actions/types';

const initialState = {
  profile: {},
  shipping: {},
  carts: [],
  payment: {},
  subToTal: 0,
  shippingCharges: 0
};

const orderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.data.shipping,
        profile: action.data.profile,
        carts: action.data.carts,
        subTotal: action.data.subTotal,
        shippingCharges: action.data.shippingCharges
      };
    case types.SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload
      };
    case types.RESET_CHECKOUT:
      return initialState;
    default: {
      return state;
    }
  }
};
export default orderReducer;
