import types from '../actions/types';

const initialState = {
  currentProductType: 'popular',
  popular: null,
  toprate: null,
  arrival: null,
  gender: null,
  loading: false
};

const productReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    //Get popular products
    case types.GET_POPULAR_PRODUCTS_SUCCESS:
      return {
        ...state,
        currentProductType: 'popular',
        popular: action.data,
        loading: false
      };
    //Get arrival products
    case types.GET_ARRIVAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        currentProductType: 'arrival',
        arrival: action.data,
        loading: false
      };
    //Get top rated products
    case types.GET_TOP_RATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        currentProductType: 'toprate',
        toprate: action.data,
        loading: false
      };

    //Get genders products
    case types.GET_GENDER_PRODUCTS_SUCCESS:
      return {
        ...state,
        currentProductType: 'gender',
        gender: action.data,
        loading: false
      };
    default:
      return { ...state, loading: true };
  }
};

export default productReducer;
