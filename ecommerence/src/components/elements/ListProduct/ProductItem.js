import * as Icon from 'react-feather';
import { Rating } from '@material-ui/lab';
import ImageLoader from '../../../common/ImageLoader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { displayMoney } from '../../../utils/hepler';
const ProductItem = props => {
  const { product, key } = props;
  const history = useHistory();
  const onClickItem = () => {
    if (!product) return;

    history.push(`/collections/${product._id}`);
  };
  return (
    <SkeletonTheme color='#e1e1e1' highlightColor='#f2f2f2'>
      <div
        className='product-display'
        onClick={onClickItem}
        role='presentation'
        key={key}
      >
        <div className='card-product'>
          {product.image ? (
            <div className='product-display-img'>
              {product.discount ? (
                <div className='image-infor discount'>
                  <span>{`${product.discount} %`}</span>
                </div>
              ) : (
                ''
              )}
              <ImageLoader
                className='product-card-img'
                src={product.image}
                alt={`No image`}
              />
              <div className='addToWishList'>
                <Icon.Heart className='heart' />
              </div>
              <div className='addToCart'>
                <Icon.ShoppingCart />
                <span>Add To Cart</span>
              </div>
            </div>
          ) : (
            <Skeleton width='100%' height='100%' />
          )}

          <div className='product-display-details'>
            <div className='title-category'>
              {get(product, 'detail.category.name', '') || (
                <Skeleton width={40} />
              )}
            </div>
            <div className='rating'>
              {product && (
                <Rating
                  name='read-only'
                  value={get(product, 'avgRating', 0)}
                  readOnly
                />
              )}
              <span className='count-review'>
                {get(product, 'detail.category.name', '') ? (
                  `(${get(product, 'rating', []).length} reviews)`
                ) : (
                  <Skeleton width={30} />
                )}
              </span>
            </div>
            <div className='title-product'>
              {product.title || <Skeleton width={80} />}
            </div>
            <div className='product-price'>
              <div className='discounted-price'>
                {product.price ? (
                  displayMoney(product.price * (100 - product.discount) * 0.01)
                ) : (
                  // `$${(product.price * (100 - product.discount) * 0.01).toFixed(
                  //   2
                  // )}`
                  <Skeleton width={40} />
                )}
              </div>
              <div className='main-price'>
                {product.price ? (
                  <span className={`${!product.discount ? 'hidden' : ''}`}>
                    {displayMoney(product.price)}
                  </span>
                ) : (
                  <Skeleton width={40} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProductItem;
