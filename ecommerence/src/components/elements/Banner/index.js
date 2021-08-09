import React from 'react';
import { FiPlus, FiHeart } from 'react-icons/fi';

const Banner = ({ data }) => {
  console.log(data.src);
  return (
    <div className={'baner'}>
      <img className='img' src={data.src} />
      <div className='banner-opacity' />
      <div className='banner-container'>
        <div className='banner-content'>
          <div className='banner-content-bottom'>
            <div className='content-part flex-2'>
              <p className={'title text-white'}>{data.title}</p>
              <div className='banner-feature'>
                <button className={'btn banner-feature-item btn-watch-hover'}>
                  <p>{'ADD TO CART'}</p>
                </button>
                <button
                  className={
                    'btn btn-o btn-border-white banner-feature-item btn-view-hover'
                  }
                >
                  <p>{'VIEW INFO'}</p>
                </button>
                <button className={'btn btn-o banner-feature-item btn-add'}>
                  <FiHeart className='icon' size={20} />
                  <p>{'ADD TO WISHLIST'}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
