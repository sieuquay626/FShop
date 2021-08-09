import React, { Fragment, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { map } from 'lodash';
import ProgressBar from '@ramonak/react-progress-bar';
import { SIZE_BANNER } from '../../../utils/constant';
import Banner from '../../elements/Banner';

const data = [
  {
    title: 'Sơ Mi Tay Ngắn Đơn Giản M3',
    src:
      'https://cdn2.yame.vn/cimg/images/a4704898-578d-0c00-0c3e-0017f4b18aa1.jpg'
  },
  {
    title: 'Sơ Mi Tay Dài Đơn Giản M19',
    src:
      'https://cdn2.yame.vn/cimg/images/b83e338f-4948-0300-4882-0017f1703c3a.jpg'
  },
  {
    title: 'Sơ Mi Tay Dài Đơn Giản M12',
    src:
      'https://cdn2.yame.vn/cimg/images/a2e36a2b-f067-0200-609a-0017ecc6b453.jpg'
  }
];

const DotSlider = ({ handle, isSelected, index, label }) => {
  return (
    <span
      onClick={event => handle(event, index)}
      className={`banner-dot ${isSelected ? 'active' : ''}`}
    />
  );
};
const SlideBanners = () => {
  const [selected, setSelected] = useState(0);
  const handleClick = (event, index) => {
    setSelected(index);
  };
  return (
    <Fragment>
      {/* <Carousel
        renderIndicator={(e, isSelected, index, label) => (
          <DotSlider
            isSelected={isSelected}
            index={index}
            label={label}
            handle={handleClick}
          />
        )}
        selectedItem={selected}
        showThumbs={false}
        infiniteLoop={true}
      >
        {map(data, (banner, key) => (
          <>
            {console.log(banner)}
            <Banner data={banner} key={key} />
          </>
        ))}
      </Carousel> */}
      <Carousel
        renderIndicator={(e, isSelected, index, label) => (
          <DotSlider
            isSelected={isSelected}
            index={index}
            label={label}
            handle={handleClick}
          />
        )}
        selectedItem={selected}
        showThumbs={false}
      >
        {map(data, (banner, key) => (
          <Banner data={banner} key={key} />
          // <>
          //   <div className='baner'>
          //     <img src={banner.src} alt='' srcset='' key={key} />
          //     <div className='banner-opacity' />
          //     <div className='banner-container'>
          //       <div className='banner-content'>
          //         <div className='banner-content-bottom'>
          //           <div className='content-part flex-2'>
          //             <p className={'title text-white'}>{banner.title}</p>
          //             <div className='banner-feature'>
          //               <button
          //                 className={'btn banner-feature-item btn-watch-hover'}
          //               >
          //                 <p>{'ADD TO CART'}</p>
          //               </button>
          //               <button
          //                 className={
          //                   'btn btn-o btn-border-white banner-feature-item btn-view-hover'
          //                 }
          //               >
          //                 <p>{'VIEW INFO'}</p>
          //               </button>
          //               <button
          //                 className={'btn btn-o banner-feature-item btn-add'}
          //               >
          //                 <FiHeart className='icon' size={20} />
          //                 <p>{'ADD TO WISHLIST'}</p>
          //               </button>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </>
        ))}
      </Carousel>
      <ProgressBar
        completed={Math.floor(((selected + 1) / SIZE_BANNER) * 100)}
        bgColor={'#FE980F'}
        baseBgColor={'#FFFFFF'}
        height={4}
        labelSize={0}
      />
    </Fragment>
  );
};
export default SlideBanners;
