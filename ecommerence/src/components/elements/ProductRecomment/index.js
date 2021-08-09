import React, { useState, useEffect } from 'react';
import './style.scss';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import * as Icon from 'react-feather';
import ProductItem from '../ProductItem';
import { recomment_product } from '../../../api/product';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const ProductRecomment = () => {
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (auth.user) {
      recomment_product({ user: auth.user._id }).then(res => {
        console.log(res.data);
        setstate(res.data);
      });
    }
  }, []);
  const [state, setstate] = useState({
    product: []
  });

  return (
    <div className='list-recomment'>
      {state.product.length ? (
        <>
          <div className='re-infor'>
            <div className='re-title'>Recomment</div>
            {/* <div className='re-viewAll'>View All</div> */}
          </div>
          <ul className='re-list-product'>
            <ScrollMenu
              arrowLeft={<Icon.ChevronLeft className='arrow-prev' />}
              arrowRight={<Icon.ChevronRight className='arrow-next' />}
              clickWhenDrag={false}
              data={state.product.map(item => {
                return <ProductItem product={item} key={item._id} />;
              })}
              dragging={false}
              hideArrows={true}
              hideSingleArrow={true}
              transition={+0.1}
              translate={0}
              wheel={true}
            />
          </ul>
        </>
      ) : (
        <LoadingOutlined className='text-center' />
      )}
    </div>
  );
};

export default ProductRecomment;
/*


      <ul className='re-list-product'>
        <ScrollMenu
          arrowLeft={<Icon.ChevronLeft className='arrow-prev' />}
          arrowRight={<Icon.ChevronRight className='arrow-next' />}
          clickWhenDrag={false}
          data={state.product.map((item, index) => {
            return <CartProduct item={item} key={item._id} />;
          })}
          dragging={false}
          hideArrows={true}
          hideSingleArrow={true}
          transition={+0.1}
          translate={0}
          wheel={true}
        />
      </ul>
*/
