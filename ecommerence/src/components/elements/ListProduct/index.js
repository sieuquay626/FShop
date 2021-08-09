import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ProductItem from '../ProductItem';
import ProductShowcaseGrid from './ProductShowcaseGrid';
import PaginationBox from '../PaginationBox';
import * as Icon from 'react-feather';
import FiltersToggle from '../FiltersToggle';
import { applyFilter, resetFilter } from '../../../redux/actions/filter';
import {
  handleArrivalProduct,
  handlePopularProduct,
  handleToprateProduct
} from '../../../redux/actions/product';
import { get } from 'lodash';
let products = [
  {
    detail: {
      color: ['back', 'white', 'ivory'],
      gender: 'Women',
      brand: {
        _id: '60b3960b7349c52008c4b5dc',
        name: 'new balance',
        photo:
          'https://res.cloudinary.com/dbdb4punq/image/upload/v1622382065/test/20200110-BrandLogos_NewBalance_bu2fbu.svg',
        createdAt: '2021-05-30T13:41:31.887Z',
        updatedAt: '2021-05-30T13:41:31.887Z',
        __v: 0
      },
      material: '',
      category: {
        _id: '60b3117b5c9c392ecc3007f7',
        name: 'dress',
        createdAt: '2021-05-30T04:15:55.055Z',
        updatedAt: '2021-05-30T04:15:55.055Z',
        __v: 0
      }
    },
    sold: 1213,
    currency: 'DOLLAR',
    rating: [],
    discount: 5,
    _id: '60b454d47ba4633654b23f56',
    title:
      'long sleeve wedding dress, vintage style wedding dress, low back, off white, classic and bohemian bridal gown',
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622427616/test/il_340x270.1008644994_n5xs_mi3qhg.jpg',
    description:
      'This elegant romantic wedding dress is handmade, its long sleeves and graceful length made from light chiffon fabric with a crochet lace belt bringing together the flattering shape of the waist. Also including a crochet detail on the sleeves, this piece is classic and timeless',
    price: 810,
    createdAt: '2021-05-31T03:15:32.583Z',
    updatedAt: '2021-05-31T11:42:18.107Z',
    __v: 1
  },
  {
    detail: {
      color: [],
      gender: 'Women',
      brand: {
        _id: '60b395427349c52008c4b5da',
        name: 'adidas',
        photo:
          'http://res.cloudinary.com/dbdb4punq/image/upload/v1622381147/test/adassctplwjqn8tujk7s.svg',
        createdAt: '2021-05-30T13:38:10.120Z',
        updatedAt: '2021-05-30T13:38:10.120Z',
        __v: 0
      },
      material: 'cotton, spandex, polyamide',
      category: {
        _id: '60b310e25c9c392ecc3007f0',
        name: 'jeans',
        createdAt: '2021-05-30T04:13:22.551Z',
        updatedAt: '2021-05-30T04:13:22.551Z',
        __v: 0
      }
    },
    sold: 219,
    currency: 'DOLLAR',
    rating: [],
    discount: 10,
    _id: '60b45a47f3eb092188debaa3',
    title:
      'two tone contrast black and white jeans- half and half patchwork jeans',
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622432167/test/il_340x270.3163799523_3eik_gh8mhv.jpg',
    description:
      'Half and half gone extreme, these jeans are contrast from the front to the back and the back to the front and even the right to the left and the left to the right with contrast back pockets.',
    price: 65,
    createdAt: '2021-05-31T03:38:47.908Z',
    updatedAt: '2021-05-31T11:49:37.753Z',
    __v: 1
  },
  {
    detail: {
      color: [],
      gender: 'Men',
      brand: {
        _id: '60b3960b7349c52008c4b5dc',
        name: 'new balance',
        photo:
          'https://res.cloudinary.com/dbdb4punq/image/upload/v1622382065/test/20200110-BrandLogos_NewBalance_bu2fbu.svg',
        createdAt: '2021-05-30T13:41:31.887Z',
        updatedAt: '2021-05-30T13:41:31.887Z',
        __v: 0
      },
      material: '100% cotton',
      category: {
        _id: '60b310e25c9c392ecc3007f0',
        name: 'jeans',
        createdAt: '2021-05-30T04:13:22.551Z',
        updatedAt: '2021-05-30T04:13:22.551Z',
        __v: 0
      }
    },
    sold: 324,
    currency: 'DOLLAR',
    rating: [],
    discount: 0,
    _id: '60b455f17ba4633654b23f58',
    title: "levi's 501 original fit jeans",
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622431096/test/05010660_gekr1q.png',
    description:
      'When you think of a great classic pair of jeans, the Levi’s 501 is what comes to mind. A regular fit is complemented with a straight leg, making them great for all body types',
    price: 46,
    createdAt: '2021-05-31T03:20:17.908Z',
    updatedAt: '2021-05-31T11:46:03.675Z',
    __v: 1
  },
  {
    detail: {
      color: [],
      gender: 'Women',
      brand: {
        _id: '60b396ac7349c52008c4b5de',
        name: 'under armour',
        photo:
          'https://res.cloudinary.com/dbdb4punq/image/upload/v1622382234/test/20200110-BrandLogos_UnderArmour_aq0bjr.svg',
        createdAt: '2021-05-30T13:44:12.285Z',
        updatedAt: '2021-05-30T13:44:12.285Z',
        __v: 0
      },
      material: 'cotton, spandex, jeans, denim',
      category: {
        _id: '60b310e25c9c392ecc3007f0',
        name: 'jeans',
        createdAt: '2021-05-30T04:13:22.551Z',
        updatedAt: '2021-05-30T04:13:22.551Z',
        __v: 0
      }
    },
    sold: 324,
    currency: 'DOLLAR',
    rating: [],
    discount: 5,
    _id: '60b457697ba4633654b23f59',
    title:
      'long wide-leg blue denim pants | wide-legged trousers for women | blue jeans [ba005-l01-np]',
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622431330/test/il_340x270.1413813895_nl0z_inlcf0.jpg',
    description:
      'Premium Quality modest denim pants, made from 98% cotton and 2% Spandex, offers both comfort and style. This wide-leg blue denim pants feature 41-inch length.',
    price: 46,
    createdAt: '2021-05-31T03:26:33.126Z',
    updatedAt: '2021-05-31T11:48:34.862Z',
    __v: 1
  },
  {
    detail: {
      color: [],
      gender: 'Kid',
      brand: {
        _id: '60b395427349c52008c4b5da',
        name: 'adidas',
        photo:
          'http://res.cloudinary.com/dbdb4punq/image/upload/v1622381147/test/adassctplwjqn8tujk7s.svg',
        createdAt: '2021-05-30T13:38:10.120Z',
        updatedAt: '2021-05-30T13:38:10.120Z',
        __v: 0
      },
      material: 'cotton',
      category: {
        _id: '60b310e25c9c392ecc3007f0',
        name: 'jeans',
        createdAt: '2021-05-30T04:13:22.551Z',
        updatedAt: '2021-05-30T04:13:22.551Z',
        __v: 0
      }
    },
    sold: 536,
    currency: 'DOLLAR',
    rating: [],
    discount: 5,
    _id: '60b45921f3eb092188debaa2',
    title: 'black distroyed denim children/toddler/baby jeans',
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622431901/test/il_340x270.1401936839_d1vq_y8hpbl.jpg',
    description:
      'Black distressed denim jeans are perfect for this fall/winter or any time of the year honestly. They will match anything! Perfectly distressed at the knee ',
    price: 34,
    createdAt: '2021-05-31T03:33:53.437Z',
    updatedAt: '2021-05-31T11:49:26.563Z',
    __v: 1
  },
  {
    detail: {
      color: [],
      gender: 'General',
      brand: {
        _id: '60b3960b7349c52008c4b5dc',
        name: 'new balance',
        photo:
          'https://res.cloudinary.com/dbdb4punq/image/upload/v1622382065/test/20200110-BrandLogos_NewBalance_bu2fbu.svg',
        createdAt: '2021-05-30T13:41:31.887Z',
        updatedAt: '2021-05-30T13:41:31.887Z',
        __v: 0
      },
      material: '99% cotton/1% elastane',
      category: {
        _id: '60b310e25c9c392ecc3007f0',
        name: 'jeans',
        createdAt: '2021-05-30T04:13:22.551Z',
        updatedAt: '2021-05-30T04:13:22.551Z',
        __v: 0
      }
    },
    sold: 564,
    currency: 'DOLLAR',
    rating: [],
    discount: 0,
    _id: '60b454fd7ba4633654b23f57',
    title: "levi's 501 slim taper jean",
    image:
      'https://res.cloudinary.com/dbdb4punq/image/upload/v1622430074/test/88940174_opq5va.png',
    description:
      'When your denim collection needs an upgrade, 501 Slim Taper Jeans from Levi’s have you covered. These jeans take the standard straight fit and revamp it with a slim and tapered leg shape. A classic five-pocket design offers convenient storage, and stretchy denim lets you move comfortably',
    price: 32,
    createdAt: '2021-05-31T03:16:13.624Z',
    updatedAt: '2021-05-31T11:45:03.899Z',
    __v: 1
  }
];
const ListProduct = () => {
  const product = useSelector(state => state.product);
  const filter = useSelector(state => state.filter);
  const category = useSelector(state => state.category.listCategory);
  const brand = useSelector(state => state.brand.listBrand);
  const dispatch = useDispatch();
  let listproduct;
  switch (product.currentProductType) {
    case 'popular':
      listproduct = product.popular;
      break;
    case 'arrival':
      listproduct = product.arrival;
      break;
    case 'toprate':
      listproduct = product.toprate;
      break;
    case 'gender':
      listproduct = product.gender;
      break;
    default:
      listproduct = products;
  }
  const handleChangePage = (page, pageSize) => {
    dispatch(applyFilter({ page: page }));
  };

  useEffect(() => {
    switch (product.currentProductType) {
      case 'popular':
        dispatch(handlePopularProduct(filter));
        break;
      case 'arrival':
        dispatch(handleArrivalProduct(filter));
        break;
      case 'toprate':
        dispatch(handleToprateProduct(filter));
        break;
      case 'gender':
        dispatch(handleArrivalProduct(filter));
        break;
      default:
        dispatch(handlePopularProduct(filter));
        break;
    }
  }, [filter]);

  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  const onRemoveBrandFilter = () => {
    dispatch(applyFilter({ brand: '', page: 1 }));
  };

  const onRemoveCategoryFilter = () => {
    dispatch(applyFilter({ category: '', page: 1 }));
  };
  const onRemovePriceRangeFilter = () => {
    dispatch(applyFilter({ minPrice: 0, maxPrice: 0, page: 1 }));
  };

  const onRemoveSortFilter = () => {
    dispatch(applyFilter({ sortBy: '', page: 1 }));
  };

  const getNameCategory = id => {
    for (let value of category) {
      if (value._id == id) {
        return value.name;
      }
    }
  };

  const getNameBrand = id => {
    for (let value of brand) {
      if (value._id == id) {
        return value.name;
      }
    }
  };

  return (
    <>
      {/* {product.loading && (
        <div class='loader-container'>
          <div className='loader'>
            <img
              src={`https://res.cloudinary.com/dbdb4punq/image/upload/v1627069315/test/Infinity-1s-200px-1--unscreen_nvvx0g.gif`}
            />
          </div>
        </div>
      )} */}

      <div className='all-product'>
        <div className='title-filter'>
          <div className='float-right'>
            <FiltersToggle>
              <button
                className='button-muted button-small btn-filter'
                type='button'
              >
                Filters &nbsp;
                <Icon.Filter />
              </button>
            </FiltersToggle>
          </div>
        </div>

        <h1 className='title-product'>{product.currentProductType} Product</h1>
        <div className='product-applied-filters'>
          {filter.brand && (
            <div className='pill-wrapper'>
              <span className='d-block'>Brand</span>
              <div className='pill padding-right-l'>
                <h5 className='pill-content margin-0'>
                  {getNameBrand(filter.brand)}
                </h5>
                <div
                  className='pill-remove'
                  onClick={onRemoveBrandFilter}
                  role='presentation'
                >
                  <h5 className='margin-0 text-subtle'>
                    <Icon.XCircle />
                  </h5>
                </div>
              </div>
            </div>
          )}
          {filter.category && (
            <div className='pill-wrapper'>
              <span className='d-block'>Category</span>
              <div className='pill padding-right-l'>
                <h5 className='pill-content margin-0'>
                  {getNameCategory(filter.category)}
                </h5>
                <div
                  className='pill-remove'
                  onClick={onRemoveCategoryFilter}
                  role='presentation'
                >
                  <h5 className='margin-0 text-subtle'>
                    <Icon.XCircle />
                  </h5>
                </div>
              </div>
            </div>
          )}

          {(!!filter.minPrice || !!filter.maxPrice) && (
            <div className='pill-wrapper'>
              <span className='d-block'>Price Range</span>
              <div className='pill padding-right-l'>
                <h5 className='pill-content margin-0'>
                  ${filter.minPrice}- ${filter.maxPrice}
                </h5>
                <div
                  className='pill-remove'
                  onClick={onRemovePriceRangeFilter}
                  role='presentation'
                >
                  <h5 className='margin-0 text-subtle'>
                    <Icon.XCircle />
                  </h5>
                </div>
              </div>
            </div>
          )}
          {filter.sortBy && (
            <div className='pill-wrapper'>
              <span className='d-block'>Sort By</span>
              <div className='pill padding-right-l'>
                <h5 className='pill-content margin-0'>
                  {filter.sortBy === 'price-desc'
                    ? 'Price High - Low'
                    : filter.sortBy === 'price-asc'
                    ? 'Price Low - High'
                    : filter.sortBy === 'name-desc'
                    ? 'Name Z - A'
                    : 'Name A - Z'}
                </h5>
                <div
                  className='pill-remove'
                  onClick={onRemoveSortFilter}
                  role='presentation'
                >
                  <h5 className='margin-0 text-subtle'>
                    <Icon.XCircle />
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* {listproduct &&
            listproduct.products.map((product, key) => {
              return <ProductItem product={product} key={key} />;
            })} */}
        <ProductShowcaseGrid
          products={get(listproduct, 'products', [])}
          skeletonCount={12}
          loading={product.loading}
        />
      </div>
      <PaginationBox
        total={get(listproduct, 'total_result', 0)}
        pageSize={get(listproduct, 'products', []).length}
        onChange={handleChangePage}
      />
    </>
  );
};

export default ListProduct;
