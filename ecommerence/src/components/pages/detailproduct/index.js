import { useState, useEffect } from 'react';

import Header from '../../elements/Header';
import Image from '../../elements/Image';
import { useParams } from 'react-router-dom';
import QuantityPicker from '../../elements/QuantityPicker';
import Button from '../../elements/Button';
import ColorChooser from '../../elements/ColorChooser';
import io from 'socket.io-client';
import * as Icon from 'react-feather';
import '../../../scss/index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../elements/Footer';

import { product_id_api } from '../../../api/product';
import { handleAddCart } from '../../../redux/actions/cart';
import { get } from 'lodash';
import { useScrollTop } from '../../../hook';
import ReviewProduct from '../../elements/ReviewProduct';
const DetailProductPage = () => {
  const [product, setProduct] = useState({});
  const [detail, setDetail] = useState({});

  const [amount, updateAmount] = useState(1);
  const [color, SetColor] = useState('');

  const postedBy = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [stateHightlight, setStateHightlight] = useState(false);
  const [stateDescription, setStateDescription] = useState(false);

  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    product_id_api(id).then(value => {
      setProduct(value.data);
      setDetail(value.data.detail);
    });
  }, [id]);

  const setupSocket = () => {
    const newSocket = io('http://localhost:5000');

    // newSocket.on('disconnect', () => {
    //   console.log('disconnect');
    //   setSocket(null);
    // });

    setSocket(newSocket);
  };
  useEffect(() => {
    setupSocket();
  }, []);

  const increment = () => {
    updateAmount(amount + 1);
  };

  const decrement = () => {
    if (amount === 1) return;
    updateAmount(amount - 1);
  };

  const addtocart = () => {
    dispatch(handleAddCart({ product, amount, colorSeclected: color }));
  };

  useScrollTop();
  return (
    <>
      <Header />
      <div className='product-detail'>
        <div className='product-detail-left'>
          <Image
            src={product.image}
            alt='Inventory item'
            className='detail-img'
          />
        </div>
        <div className='product-detail-right'>
          <h1 className='product-detail-title'>{product.title}</h1>
          <div className='price-item'>
            <h2 className='price-discount'>{`$
            ${(product.price * (100 - Number(product.discount))) / 100}
              `}</h2>
            {Number(product.discount) !== 0 ? (
              <h2 className='price-reality  '>{`$${product.price}`}</h2>
            ) : (
              ''
            )}
          </div>
          {Number(product.discount) != 0 ? (
            <h2 className='discount text-success'>{`You save $${(product.price *
              Number(product.discount)) /
              100} (${product.discount}%)`}</h2>
          ) : (
            ''
          )}

          <div
            className={`hight-light `}
            onClick={() => setStateHightlight(!stateHightlight)}
          >
            <span>Hightlights</span>
            {stateHightlight ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
          </div>
          <div
            className={`product-details-content ${
              stateHightlight ? 'show' : ''
            }`}
          >
            <div className='product-details-item'>
              <Icon.Scissors />
              <span>Handmade</span>
            </div>
            <div className='product-details-item'>
              <Icon.Package />
              <span>Materials:</span>
              <span>{detail.material}</span>
            </div>
          </div>

          <div
            className='hight-light'
            onClick={() => {
              setStateDescription(!stateDescription);
            }}
          >
            <span>Description</span>
            {stateDescription ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
          </div>
          <div
            className={`product-details-content ${
              stateDescription ? 'show' : ''
            }`}
          >
            <div className='description'>{product.description}</div>
          </div>

          <br />
          {get(detail, 'color', []).length ? (
            <ColorChooser
              availableColors={detail.color}
              SetColor={SetColor}
              color={color}
            />
          ) : (
            ''
          )}

          <div className='quantity'>
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={amount}
              name={'Quantity'}
            />
          </div>
          <Button
            full
            title='Add to Cart'
            className='w-full'
            onClick={addtocart}
          />
        </div>
      </div>

      {/* <div className='similar-product'>Similar Product</div> */}
      <ReviewProduct id={id} postedBy={postedBy} socket={socket} />
      <Footer />
    </>
  );
};

export default DetailProductPage;
