import types from '../actions/types';

const initialState = {
  user: null,
  isOAuth: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        user: action.data.user,
        isOAuth: true
      };
    case types.LOGIN_FAILED:
      return initialState;
    case types.ON_AUTHSTATE_SUCCESS:
      return {
        user: action.data.user,
        isOAuth: true
      };
    case types.ON_AUTHSTATE_FAILED:
      return initialState;
    case types.LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
