/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const CashOnDelivery = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div
      className={`checkout-fieldset-collapse ${
        values.type === 'cod' ? 'is-selected-payment' : ''
      }`}
    >
      <div className='checkout-field margin-0'>
        <div className='checkout-checkbox-field'>
          <input
            checked={values.type === 'cod'}
            id='modeCod'
            name='type'
            onChange={e => {
              if (e.target.checked) {
                setValues({ ...values, type: 'cod' });
              }
            }}
            type='radio'
          />
          <label className='d-flex w-full' htmlFor='modeCod'>
            <div className='infor-payment'>
              <h4>Cash On Delivery</h4>
              <span className='text-payment'>
                Our driver will collect cash from recipient upon delivery
              </span>
            </div>
            <img
              src='https://res.cloudinary.com/dbdb4punq/image/upload/v1626738151/test/5517930-removebg_ucqvc8.png'
              className={'payment-cod'}
            />
            {/* <div className='payment-cod' /> */}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
