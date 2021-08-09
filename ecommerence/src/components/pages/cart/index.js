import React, { useState } from 'react';
import Header from '../../elements/Header';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';
import QuantityPicker from '../../elements/QuantityPicker';
import { slugify } from '../../../utils/hepler';
import * as Icon from 'react-feather';
const CartPage = () => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(
    false
  );

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'name1',
      quantity: 2,
      price: 25,
      image:
        'https://res.cloudinary.com/dbdb4punq/image/upload/v1621208916/test/43cfb32c-f5b7-af00-9b4a-0017f24cd900-removebg-preview_i7ixee.png'
    },
    {
      id: 2,
      name: 'name2',
      quantity: 1,
      price: 42,
      image:
        'https://res.cloudinary.com/dbdb4punq/image/upload/v1621978262/test/deal_ofthe_week_wrsxqb.png'
    }
  ]);
  const removeFromCart = item => {
    const newCart = cart.filter(value => {
      return item.id != value.id;
    });
    setCart(newCart);
  };

  const increment = item => {
    const newCart = cart.map(value => {
      if (value.id === item.id) {
        value.quantity += 1;
      }
      return value;
    });
    setCart(newCart);
  };

  const decrement = item => {
    if (item.quantity === 1) return;
    const newCart = cart.map(value => {
      if (value.id === item.id) {
        value.quantity -= 1;
      }
      return value;
    });
    setCart(newCart);
  };
  return (
    <>
      <Header />
      <div className='pb-10 cart'>
        <div className='flex flex-col'>
          <div className='pt-10 pb-8'>
            <h1 className='text-5xl font-light'>Your Cart</h1>
          </div>

          {cart.length == 0 ? (
            <h3>No items in cart.</h3>
          ) : (
            // <div className='flex flex-col'></div>
            <div>
              {cart.map(item => {
                return (
                  <div className='border py-10' key={item.id}>
                    <div className='flex items-center  hidden md:flex'>
                      <Link to={`/product/${slugify(item.name)}`}>
                        <Image
                          className='w-32 m-0'
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <Link to={`/product/${slugify(item.name)}`}>
                        <p
                          className='
                                m-0 pl-10 text-gray-600 w-60
                                '
                        >
                          {item.name}
                        </p>
                      </Link>
                      <div className='quantityPicker'>
                        <QuantityPicker
                          numberOfitems={item.quantity}
                          increment={() => increment(item)}
                          decrement={() => decrement(item)}
                        />
                      </div>
                      <div className='flex flex-1 justify-end'>
                        <p className='m-0 pl-10 text-gray-900 tracking-wider'>
                          {`$` + item.price}
                        </p>
                      </div>
                      <div
                        role='button'
                        onClick={() => removeFromCart(item)}
                        className='
                            m-0 ml-10 text-gray-900 text-s cursor-pointer
                            '
                      >
                        <Icon.X />
                      </div>
                    </div>

                    <div className='flex items-center flex md:hidden'>
                      <Link to={`/product/${slugify(item.name)}`}>
                        <Image
                          className='w-32 m-0'
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <div>
                        <Link href={`/product/${slugify(item.name)}`}>
                          <p
                            className='
                                  m-0 pl-6 text-gray-600 text-base
                                  '
                          >
                            {item.name}
                          </p>
                        </Link>
                        <div className='ml-6 mt-4 mb-2'>
                          <QuantityPicker
                            hideQuantityLabel
                            numberOfitems={item.quantity}
                            increment={() => increment(item)}
                            decrement={() => decrement(item)}
                          />
                        </div>
                        <div className='flex flex-1'>
                          <p className='text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider'>
                            {`$` + item.price}
                          </p>
                        </div>
                      </div>
                      <div
                        role='button'
                        onClick={() => removeFromCart(item)}
                        className='
                            m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2
                            '
                      >
                        <Icon.X />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className='flex flex-1 justify-end py-8'>
            <p className='text-sm pr-10'>Total</p>
            <p className='font-semibold tracking-wide'>
              {`$` +
                cart.reduce((a, b) => {
                  return a.price * a.quantity + b.price * b.quantity;
                })}
            </p>
          </div>
          {cart.length && (
            <Link to='/checkout'>
              <div className='cursor-pointer flex items-center'>
                <p className='text-gray-600 text-sm mr-2'>
                  Proceed to check out
                </p>
                <Icon.ArrowRight className='text-gray-600' />
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
