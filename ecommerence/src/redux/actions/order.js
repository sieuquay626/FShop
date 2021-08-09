import types from './types';

const setShippingDetail = (
  shipping,
  profile,
  carts,
  subTotal,
  shippingCharges
) => {
  return {
    type: types.SET_CHECKOUT_SHIPPING_DETAILS,
    data: {
      shipping,
      profile,
      carts,
      subTotal,
      shippingCharges
    }
  };
};

const setPaymentDetails = details => {
  return {
    type: types.SET_CHECKOUT_PAYMENT_DETAILS,
    payload: details
  };
};

const resetCheckout = () => ({
  type: types.RESET_CHECKOUT
});

export { setShippingDetail, setPaymentDetails, resetCheckout };
