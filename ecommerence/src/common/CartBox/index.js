import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import CartItem from './cartItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleClearCart } from '../../redux/actions/cart';
import { displayMoney } from '../../utils/hepler';
import Modal from '../../common/Modal';
import { useModal } from '../../hook';
const CartBox = ({ showCart, closeCart }) => {
  const [subTotal, setSubTotal] = useState(0);
  const carts = useSelector(state => state.cart.listToCartProduct);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  const nextCheckout = event => {
    if (!auth.user) {
      console.log('vao nextCheckout');
      event.preventDefault();
      onOpenModal();
    } else {
      if (!subTotal) {
        event.preventDefault();
      } else {
        history.push('/checkout/step1');
      }
    }
  };
  const clearCart = event => {
    event.preventDefault();
    dispatch(handleClearCart());
  };
  useEffect(() => {
    let temp = 0;
    carts.map(value => {
      temp +=
        Number(value.product.price) *
        (100 - Number(value.product.discount)) *
        0.01 *
        value.amount;
    });
    setSubTotal(temp);
  }, [carts]);

  return showCart ? (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <p className='text-center'>You must sign in to continue checkout</p>
        <br />
        <div className='d-flex-center'>
          <button
            className='button button-border button-border-gray btn-modal-review'
            onClick={onCloseModal}
            type='button'
          >
            Continue shopping
          </button>
          &nbsp; &nbsp;
          <button
            className='button btn-modal-review'
            onClick={() => history.push('/login')}
            type='button'
          >
            Sign in to checkout
          </button>
        </div>
      </Modal>
      <div className={`cart-box ${showCart ? 'show' : ''}`}>
        <div className='header-cart'>
          <span>My Cart</span>
          <span className='close' onClick={closeCart}>
            <Icon.X />
          </span>
        </div>

        <div className='list-cart'>
          {carts.map((value, key) => (
            <CartItem data={value} key={key} />
          ))}

          {!carts.length ? (
            <div
              className='img_no_item'
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dbdb4punq/image/upload/v1622691603/test/521-5212497_empty-cart-hd-png-download-removebg-preview_y8sahk.png)`
              }}
            ></div>
          ) : (
            ''
          )}
        </div>
        <div className='sub-total'>
          <span className='total-title'>SubTotal:</span>
          <span className='total-price'>{displayMoney(subTotal)}</span>
        </div>

        <div className='header-cart-checkout'>
          <di className='act btn-clearcart' onClick={event => clearCart(event)}>
            <span>Clear Cart</span>
          </di>
          <div
            className={`act btn-checkout ${subTotal ? '' : 'check'}`}
            onClick={event => nextCheckout(event)}
          >
            <span>Checkout</span>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default CartBox;
