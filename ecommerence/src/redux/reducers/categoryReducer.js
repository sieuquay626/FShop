import types from '../actions/types';

const initialState = {
  listCategory: []
};
const categoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_LIST_CATEGORIES_SUCCESS: {
      return {
        ...state,
        listCategory: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;
