import * as Icon from 'react-feather';
import { useEffect } from 'react';
import { displayMoney } from '../../utils/hepler';
import {
  handleAddCart,
  handleMinusCart,
  handleDeleteCart
} from '../../redux/actions/cart';
import { useDispatch } from 'react-redux';
const CartItem = ({ data, key }) => {
  const { product, amount } = data;
  const dispatch = useDispatch();
  const handleIncrementAmount = product => {
    dispatch(handleAddCart({ product }));
  };
  const handleDecrementAmount = product => {
    dispatch(handleMinusCart({ product }));
  };

  const handleDelete = product => {
    dispatch(handleDeleteCart({ product }));
  };
  return (
    <>
      {product && amount ? (
        <div className='item-cart' key={key}>
          <div
            className='view-img'
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
          <div className='infor-item'>
            <div className='item-name'>{product.title}</div>
            <div className='item-price'>
              {displayMoney(product.price * (100 - product.discount) * 0.01)}
            </div>
          </div>
          <div className='item-amount'>
            <div
              className={`amount ${amount == 1 ? 'minus' : ''}`}
              onClick={() => handleDecrementAmount(product)}
            >
              <Icon.Minus />
            </div>
            <div className='amount val'>{amount}</div>
            <div
              className='amount'
              onClick={() => handleIncrementAmount(product)}
            >
              <Icon.Plus />
            </div>
          </div>
          <div className='trash' onClick={() => handleDelete(product)}>
            <Icon.Trash2 />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default CartItem;
