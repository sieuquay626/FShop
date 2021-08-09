import { useHistory } from 'react-router-dom';
import { useScrollTop } from '../../../../hook/index';
import { ArrowRight, ArrowLeft } from 'react-feather';
import { displayMoney } from '../../../../utils/hepler';
import * as Yup from 'yup';
import Header from '../../../elements/Header';
import Footer from '../../../elements/Footer';
import StepTracker from '../StepTracker';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../../../../common/CustomInput';
import CustomMobileInput from '../../../../common/CustomMobileInput';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingDetail } from '../../../../redux/actions/order';
const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Full name is required.')
    .min(2, 'Full name must be at least 2 characters long.')
    .max(60, 'Full name must only be less than 60 characters.'),
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  address: Yup.string().required('Shipping address is required.'),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string().required('Mobile number is required'),
      value: Yup.string().required('Mobile number is required')
    })
    .required('Mobile number is required.'),
  isInternational: Yup.boolean()
});
const initFormikValues = {
  fullname: '',
  email: '',
  address: '',
  mobile: {},
  isInternational: false
};

const ShippingDetails = () => {
  useScrollTop();
  const history = useHistory();
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.listToCartProduct);
  const profile = useSelector(state => state.auth.user);
  let subTotal = 0;
  carts.every(value => {
    subTotal +=
      Number(value.product.price) *
      (100 - Number(value.product.discount)) *
      0.01 *
      value.amount;
    return subTotal;
  });
  const onSubmitForm = form => {
    const shipping = {
      fullname: form.fullname,
      email: form.email,
      address: form.address,
      mobile: form.mobile,
      isInternational: form.isInternational
    };
    const shippingCharges = shipping.isInternational ? 50 : 0;

    dispatch(
      setShippingDetail(shipping, profile, carts, subTotal, shippingCharges)
    );

    history.push('/checkout/step3');
  };
  return (
    <>
      <Header />
      <div className='checkout'>
        <StepTracker current={2} />
        <div className='checkout-step-2'>
          <h3 className='text-center title-checkout '>Shipping Details</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitForm}
          >
            {props => (
              <Form>
                <div className='checkout-shipping-form'>
                  <div className='checkout-fieldset'>
                    <div className='checkout-field'>
                      <Field
                        name='fullname'
                        type='text'
                        label='* Full Name'
                        placeholder='Enter your full name'
                        component={CustomInput}
                        // style={{ textTransform: 'capitalize' }}
                      />
                    </div>

                    <div className='checkout-field'>
                      <Field
                        name='email'
                        type='email'
                        label='* Email Address'
                        placeholder='Enter your email address'
                        component={CustomInput}
                      />
                    </div>
                  </div>
                  <div className='checkout-fieldset'>
                    <div className='checkout-field'>
                      <Field
                        name='address'
                        type='text'
                        label='* Shipping Address'
                        placeholder='Enter full shipping address'
                        component={CustomInput}
                      />
                    </div>

                    <div className='checkout-field'>
                      <CustomMobileInput
                        name='mobile'
                        // label='Mobile Number'
                        defaultValue={'0334862484'}
                      />
                    </div>
                  </div>
                  <div className='checkout-fieldset'>
                    <Field name='isInternational'>
                      {({ field, form, meta }) => (
                        <div className='checkout-field'>
                          {meta.touched && meta.error ? (
                            <span className='label-input label-error'>
                              {meta.error}
                            </span>
                          ) : (
                            // eslint-disable-next-line jsx-a11y/label-has-associated-control
                            <label className='label-input' htmlFor={field.name}>
                              Shipping Option
                            </label>
                          )}
                          <div className='checkout-checkbox-field'>
                            <input
                              className={'check-box'}
                              checked={field.value}
                              id={field.name}
                              onChange={e => {
                                form.setValues({
                                  ...form.values,
                                  [field.name]: e.target.checked
                                });
                              }}
                              value={meta.value}
                              type='checkbox'
                            />
                            <label
                              className='d-flex w-full'
                              htmlFor={field.name}
                            >
                              <h5 className='d-flex international-shipping'>
                                &nbsp; International Shipping &nbsp;
                                <span className='text-subtle'>7-14 days</span>
                              </h5>
                              <h4 className='price-shipping'>$50.00</h4>
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
                <div className='checkout-total '>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <span className='d-block margin-0 padding-right-s text-right'>
                            International Shipping: &nbsp;
                          </span>
                        </td>
                        <td>
                          <h4 className=' text-subtle text-right margin-0 '>
                            {props.values.isInternational ? '$50.00' : '$0.00'}
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className='d-block margin-0 padding-right-s text-right'>
                            Subtotal: &nbsp;
                          </span>
                        </td>
                        <td>
                          <h4 className=' text-subtle text-right margin-0'>
                            {displayMoney(subTotal)}
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className='s-total'>Total: &nbsp;</span>
                        </td>
                        <td>
                          <h2 className='basket-total-amount '>
                            {displayMoney(
                              Number(subTotal) +
                                (props.values.isInternational ? 50 : 0)
                            )}
                          </h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='checkout-shipping-action'>
                  <button
                    className='button button-muted'
                    onClick={() => history.push(`/checkout/step1`)}
                    type='button'
                  >
                    <ArrowLeft />
                    &nbsp; Go Back
                  </button>
                  <button className='button button-icon' type='submit'>
                    Next Step &nbsp;
                    <ArrowRight />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

// ShippingDetails.propTypes = {
//   subtotal: PropType.number.isRequired,
//   profile: PropType.shape({
//     fullname: PropType.string,
//     email: PropType.string,
//     address: PropType.string,
//     mobile: PropType.object
//   }).isRequired,
//   shipping: PropType.shape({
//     fullname: PropType.string,
//     email: PropType.string,
//     address: PropType.string,
//     mobile: PropType.object,
//     isInternational: PropType.bool,
//     isDone: PropType.bool
//   }).isRequired
// };

export default ShippingDetails;
