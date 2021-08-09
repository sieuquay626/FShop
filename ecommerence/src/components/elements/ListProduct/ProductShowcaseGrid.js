import ProductItem from './ProductItem';
import PropType from 'prop-types';
import React from 'react';

const ProductShowcase = ({ products, skeletonCount, loading }) => (
  <div className='product-display-gird'>
    {loading
      ? new Array(skeletonCount)
          .fill({})
          .map((product, index) => (
            <ProductItem key={`product-skeleton ${index}`} product={product} />
          ))
      : products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
  </div>
);

ProductShowcase.defaultProps = {
  skeletonCount: 4
};

ProductShowcase.propTypes = {
  products: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default ProductShowcase;
