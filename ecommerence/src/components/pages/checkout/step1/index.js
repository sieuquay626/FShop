import * as Icon from 'react-feather';
import { displayMoney } from '../../../../utils/hepler';
import { useScrollTop } from '../../../../hook/index';
import { useEffect } from 'react';
import Header from '../../../elements/Header';
import { useHistory } from 'react-router-dom';
import StepTracker from '../StepTracker';
import { useState } from 'react';
import CartItem from '../../../../common/CartBox/cartItem';
import { useSelector } from 'react-redux';
import Footer from '../../../elements/Footer';

const OrderSummary = () => {
  useScrollTop();
  const history = useHistory();
  const onClickPrevious = () => history.push('/');
  const onClickNext = () => {
    history.push('/checkout/step2');
  };
  const carts = useSelector(state => state.cart.listToCartProduct);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let temp = 0;
    carts.forEach(value => {
      temp +=
        Number(value.product.price) *
        (100 - Number(value.product.discount)) *
        0.01 *
        value.amount;
    });
    setSubTotal(temp);
    if (!carts.length) {
      history.push('/');
    }
  }, [carts]);
  return (
    <>
      <Header />
      <div className='checkout'>
        <StepTracker current={1} />
        <div className='checkout-step-1'>
          <h3 className='text-center title-checkout'>Order Summary</h3>
          <span className='d-block text-center'>Review items in your cart</span>
          <br />
          <div className='checkout-items'>
            <div className='list-cart'>
              {carts.map((value, key) => (
                <CartItem data={value} key={key} />
              ))}
            </div>
          </div>
          <div className='basket-total'>
            <p className='basket-total-title'>Subtotal:</p>
            <h2 className='basket-total-amount'>{displayMoney(subTotal)}</h2>
          </div>
          <div className='checkout-shipping-action'>
            <button className='button button-muted' onClick={onClickPrevious}>
              <Icon.Home /> Continue Shopping{' '}
            </button>
            <button className='button ' onClick={onClickNext}>
              Next Step <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSummary;
