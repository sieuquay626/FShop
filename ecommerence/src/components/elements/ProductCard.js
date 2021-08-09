import React from 'react';
import ImageLoader from '../../common/ImageLoader';
import { displayMoney } from '../../utils/hepler';
const ProductCard = ({ itemData }) => {
  let offerPrice =
    (itemData.product.price * (100 - itemData.product.discount)) / 100;
  return (
    <div className='product-card'>
      <div className='infor-product'>
        {itemData.product.image && (
          <ImageLoader
            className='product-card-img'
            src={itemData.product.image}
          ></ImageLoader>
        )}
        <div className='infor-product-sub'>
          <h1 className='title-product-card'>{itemData.product.title}</h1>
          {itemData.product.discount ? (
            <div className='nav-price'>
              <span className='text-offerprice'>
                {displayMoney(offerPrice)}
              </span>
              <span className='text-price'>
                <s> {displayMoney(itemData.product.price)}</s>
              </span>
              <span className='text-success'>
                {itemData.product.discount}% off
              </span>
            </div>
          ) : (
            <span className='text-offerprice'>
              {displayMoney(itemData.product.price)}
            </span>
          )}
        </div>
      </div>
      <div className='product-total'>
        <p className='text-success'>
          {displayMoney(offerPrice * itemData.amount)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
