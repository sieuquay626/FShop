import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useSelector } from 'react-redux';
import CartBox from '../../../common/CartBox';
import SearchBox from '../../../common/SearchBox';
import HeaderUserInfor from '../../../common/HeaderUserInfor';

const Header = React.memo(props => {
  const auth = useSelector(state => state.auth);
  const carts = useSelector(state => state.cart.listToCartProduct);
  const [state, setState] = useState({
    showCart: false
  });
  const [nav, setNavbar] = useState(false);
  const changeNav = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener('scroll', changeNav);
  const handleClickCart = () => {
    setState({
      showCart: !state.showCart
    });
  };
  // const auth = {
  //   isOAuth: true,
  //   user: {
  //     email: 'tanphat261098@gmail.com',
  //     profile: {
  //       name: 'Phat Nguyen',
  //       avatar:
  //         'https://res.cloudinary.com/dbdb4punq/image/upload/v1619375333/test/depositphotos_309156466-stock-illustration-male-face-avatars-man-silhouette_ekgi4z.jpg'
  //     }
  //   }
  // };

  return (
    <>
      <div className={`header ${nav ? 'scroll' : ''}`}>
        <div className='left-header'>
          <Link to='/'>
            <h1>
              <span>NTP</span>-SHOP{' '}
            </h1>
          </Link>
        </div>
        <div className='input-search'>
          <SearchBox />
        </div>
        <ul className='right-header'>
          <li>
            <Link to='#'>
              <Icon.Heart />
              <span>Wishlist</span>
            </Link>
          </li>
          <li onClick={handleClickCart}>
            <Link to='#'>
              <Icon.ShoppingCart />
            </Link>
            {carts.length ? (
              <div className='bell-size'>{carts.length}</div>
            ) : (
              ''
            )}
          </li>
          <li className={`${auth.isOAuth ? 'user-nav-item' : ''}`}>
            {auth.isOAuth ? (
              <HeaderUserInfor />
            ) : (
              <Link to='/login'>
                <Icon.Lock />
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
      <CartBox showCart={state.showCart} closeCart={handleClickCart} />
    </>
  );
});

export default Header;
