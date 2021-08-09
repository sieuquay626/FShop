import axiosInstance from '../utils/axios';

const checkout_paypal = orderId => {
  return axiosInstance.post(
    '/checkout/paypal',
    {
      orderId
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

/*

*/
export { checkout_paypal };
