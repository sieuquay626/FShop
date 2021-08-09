import * as Icon from 'react-feather';
import BasketItemControl from './BasketItemControl';
import { displayMoney } from '../../../utils/hepler';
import PropType from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from '../../../common/ImageLoader';
const BasketItem = ({ product }) => {
  // const onRemoveFromBasket = () => console.log('remove from basket')};

  return (
    <div className='basket-item'>
      <BasketItemControl product={product} />
      <div className='basket-item-wrapper'>
        <div className='basket-item-img-wrapper'>
          <ImageLoader
            alt={product.title}
            className='basket-item-img'
            src={product.image}
          />
        </div>
        <div className='basket-item-details'>
          <Link
            to={`/product/${product._id}`}
            onClick={() => document.body.classList.remove('is-basket-open')}
          >
            <h4 className='underline basket-item-name'>{product.name}</h4>
          </Link>
          <div className='basket-item-specs'>
            <div>
              <span className='spec-title'>Quantity</span>
              <h5 className='my-0'>{product.quantity}</h5>
            </div>
            <div>
              <span className='spec-title'>Size</span>
              <h5 className='my-0'>{product.selectedSize} mm</h5>
            </div>
            <div>
              <span className='spec-title'>Color</span>
              <div
                style={{
                  backgroundColor:
                    product.selectedColor || product.availableColors[0],
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>
        </div>
        <div className='basket-item-price'>
          <h4 className='my-0'>
            {displayMoney(product.price * product.quantity)}
          </h4>
        </div>
        <button
          className='basket-item-remove button button-border button-border-gray button-small'
          onClick={onRemoveFromBasket}
          type='button'
        >
          <Icon.X />
        </button>
      </div>
    </div>
  );
};

// BasketItem.propTypes = {
//   product: PropType.shape({
//     id: PropType.string,
//     name: PropType.string,
//     brand: PropType.string,
//     price: PropType.number,
//     quantity: PropType.number,
//     maxQuantity: PropType.number,
//     description: PropType.string,
//     keywords: PropType.arrayOf(PropType.string),
//     selectedSize: PropType.string,
//     selectedColor: PropType.string,
//     imageCollection: PropType.arrayOf(PropType.string),
//     sizes: PropType.arrayOf(PropType.number),
//     image: PropType.string,
//     imageUrl: PropType.string,
//     isFeatured: PropType.bool,
//     isRecommended: PropType.bool,
//     availableColors: PropType.arrayOf(PropType.string)
//   }).isRequired
// };

export default BasketItem;
