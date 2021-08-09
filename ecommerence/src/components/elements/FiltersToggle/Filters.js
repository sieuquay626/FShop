/* eslint-disable no-nested-ternary */
// import { useDidMount } from 'hooks';
import PropType from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { applyFilter, resetFilter } from '../../../redux/actions/filter';
import { selectMax, selectMin } from '../../../selectors';
import PriceRange from '../PriceRange';
import { get } from 'lodash';

const Filters = ({ closeModal }) => {
  const { filter, product, brands } = useSelector(state => ({
    filter: state.filter,
    product: state.product,
    brands: state.brand.listBrand
  }));
  const [field, setFilter] = useState({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy,
    page: 1
  });
  const dispatch = useDispatch();
  let max, min;
  let listProduct;
  switch (product.currentProductType) {
    case 'popular':
      listProduct = get(product, 'popular.products', []);
      break;
    case 'arrival':
      listProduct = get(product, 'arrival.products', []);
      break;
    case 'toprate':
      listProduct = get(product, 'toprate.products', []);
      break;
    case 'gender':
      listProduct = get(product, 'gender.products', []);
      break;
    default:
      break;
  }
  max = selectMax(listProduct);
  min = selectMin(listProduct);

  // useEffect(() => {
  //   console.log(product.currentProductType);
  //   switch (product.currentProductType) {
  //     case 'popular':
  //       dispatch(handlePopularProduct(filter));
  //       break;
  //     case 'arrival':
  //       dispatch(handleArrivalProduct(filter));
  //       break;
  //     case 'toprate':
  //       dispatch(handleToprateProduct(filter));
  //       break;
  //     case 'gender':
  //       dispatch(handleArrivalProduct(filter));
  //       break;
  //     default:
  //       break;
  //   }
  // }, [filter]);
  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some(
      key => field[key] !== filter[key]
    );

    if (field.minPrice > field.maxPrice) {
      return;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

    if (filterFields.some(key => !!filter[key])) {
      dispatch(resetFilter());
    } else {
      closeModal();
    }
  };

  const onBrandFilterChange = e => {
    const val = e.target.value;
    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange = e => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onPriceChange = (minVal, maxVal) => {
    setFilter({ ...field, minPrice: minVal, maxPrice: maxVal });
  };

  return (
    <>
      {console.log('filter')}
      <div className='filters'>
        <div className='filters-field'>
          <span>Brand</span>
          <br />
          <br />
          <select
            className='filters-brand'
            value={field.brand}
            onChange={onBrandFilterChange}
          >
            <option value='all'>All Brands</option>
            {brands.map((value, key) => (
              <option value={value._id} key={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
        <div className='filters-field'>
          <span>Sort By</span>
          <br />
          <br />
          <select
            className='filters-sort-by d-block'
            value={field.sortBy}
            onChange={onSortFilterChange}
          >
            <option value=''>None</option>
            <option value='name-asc'>Name Ascending A - Z</option>
            <option value='name-desc'>Name Descending Z - A</option>
            <option value='price-desc'>Price High - Low</option>
            <option value='price-asc'>Price Low - High</option>
          </select>
        </div>
        <div className='filters-field'>
          <span>Price Range</span>
          <br />
          <br />
          <PriceRange
            min={min}
            max={max}
            initMin={field.minPrice}
            initMax={field.maxPrice}
            onPriceChange={onPriceChange}
            productsCount={listProduct.length}
          />
        </div>
        <div className='filters-action'>
          <button
            className='filters-button button button-small'
            onClick={onApplyFilter}
            type='button'
          >
            Apply filters
          </button>
          <button
            className='filters-button button button-border button-small'
            onClick={onResetFilter}
            type='button'
          >
            Reset filters
          </button>
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  closeModal: PropType.func.isRequired
};

export default withRouter(Filters);
