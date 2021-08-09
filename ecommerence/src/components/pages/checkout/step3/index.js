import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import StepTracker from '../StepTracker';
import Header from '../../../elements/Header';
import { useScrollTop } from '../../../../hook/index';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Footer from '../../../elements/Footer';
import PayPalPayment from './PayPalPayment';
// import CreditPayment from './CreditPayment';
import CashOnDelivery from './CashOnDelivery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { displayMoney } from '../../../../utils/hepler';
import { checkout_paypal } from '../../../../api/checkout';
import { create_order } from '../../../../api/order';
import { handleClearCart } from '../../../../redux/actions/cart';
import { resetCheckout } from '../../../../redux/actions/order';
const Payment = () => {
  const history = useHistory();
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();
  useScrollTop();
  const onConfirm = form => {
    create_order({ order, type: form.type }).then(res => {
      console.log(res);
      if (form.type === 'paypal') {
        checkout_paypal(res.data.orderId).then(value => {
          window.open(value.data.links, '_self');
        });
      }
      if (form.type === 'cod') {
        history.push(`/account/orders/${res.data.orderId}`);
      }
      dispatch(handleClearCart());
      dispatch(resetCheckout());
    });
  };

  const FormSchema = Yup.object().shape({
    type: Yup.string().required('Please select paymend mode')
  });

  const initFormikValues = {
    type: 'paypal'
  };
  return (
    <>
      <Header />
      <div className='checkout'>
        <StepTracker current={3} />
        <Formik
          initialValues={initFormikValues}
          validateOnChange
          validationSchema={FormSchema}
          onSubmit={onConfirm}
        >
          {() => (
            <Form className='checkout-step-3'>
              <h3 className='text-center title-checkout '>Payment</h3>
              <br />
              <span className='d-block padding-s'>Payment Option</span>
              {/* <CreditPayment /> */}
              <PayPalPayment />
              <CashOnDelivery />
              <div className='basket-total text-right'>
                <p className='basket-total-title'>Total:</p>
                <h2 className='basket-total-amount'>
                  {displayMoney(
                    Number(order.subTotal) +
                      (order.shipping.isInternational ? 50 : 0)
                  )}
                </h2>
              </div>
              <div className='checkout-shipping-action'>
                <button
                  className='button button-muted'
                  onClick={() => history.push('/checkout/step2')}
                  type='button'
                >
                  <ArrowLeftOutlined />
                  &nbsp; Go Back
                </button>
                <button className='button' type='submit'>
                  <CheckOutlined />
                  &nbsp; Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
