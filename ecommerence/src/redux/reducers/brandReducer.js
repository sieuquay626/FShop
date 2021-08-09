import types from '../actions/types';

const initialState = {
  listBrand: []
};

const brandReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_LIST_BRANDS_SUCCESS: {
      return {
        ...state,
        listBrand: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default brandReducer;
