import types from '../actions/types';

const initState = {
  page: 1,
  limit: 12,
  keyword: '',
  brand: '',
  category: '',
  minPrice: 0,
  maxPrice: 0,
  sortBy: ''
};
const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case types.RESET_FILTER:
      return initState;
    case types.APPLY_FILTER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default filterReducer;
