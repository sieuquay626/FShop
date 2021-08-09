import types from './types';

const handleLogin = (data, callback) => ({
  type: types.LOGIN,
  payload: {
    data,
    callback
  }
});

const handleLoginSuccess = data => ({
  type: types.LOGIN_SUCCESS,
  data
});
const handleLoginError = () => ({
  type: types.LOGIN_FAILED
});
// const handleLoginWithGoogle = () => ({
//   type: types.LOGIN_WITH_GOOGLE
// });

const handleAuth = () => ({
  type: types.SET_AUTH_PERSISTENCE
});

const handleAuthSuccess = data => ({
  type: types.ON_AUTHSTATE_SUCCESS,
  data
});

const handleAuthError = () => ({
  type: types.ON_AUTHSTATE_FAILED
});

const handleLogout = () => ({
  type: types.LOGOUT
});

const handleLogoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

const resetPassword = email => ({
  type: types.RESET_PASSWORD,
  payload: { email }
});

export {
  handleLogin,
  handleLoginSuccess,
  handleLoginError,
  // handleLoginWithGoogle,
  handleLogout,
  handleLogoutSuccess,
  resetPassword,
  handleAuth,
  handleAuthSuccess,
  handleAuthError
};
