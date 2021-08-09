import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/auth';
import types from '../actions/types';
import {
  login_api,
  // google_api,
  get_profile_api,
  logout_api
} from '../../api/auth';

function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}
function* handleLogin({ payload }) {
  const { data, callback } = payload;
  try {
    const result = yield call(login_api, data);
    callback({ error: false });
    yield put(actions.handleLoginSuccess(result.data));
  } catch (error) {
    const message = error.response.data.msg || error.message;
    callback({ error: true, message });
    yield put(actions.handleLoginError());
  }
}

// function* handleLoginWithGoogle() {
//   const result = yield call(google_api);
// }

function* handleAuth() {
  try {
    const result = yield call(get_profile_api);
    if (result.data.user) {
      yield put(actions.handleAuthSuccess(result.data));
    } else {
      yield put(actions.handleAuthError());
    }
  } catch (error) {
    const message = error.response.data.msg || error.message;
    console.log(message);
    yield put(actions.handleAuthError());
  }
}

function* handleLogout() {
  const result = yield call(logout_api);
  console.log(result);
  document.cookie = 'session=; session.sig=; ';
  delCookie(`session`);
  delCookie(`session.sig`);
  yield put(actions.handleLogoutSuccess());
}

const sagaAuth = [
  takeEvery(types.LOGIN, handleLogin),
  // takeEvery(types.LOGIN_WITH_GOOGLE, handleLoginWithGoogle),
  takeEvery(types.LOGOUT, handleLogout),
  takeEvery(types.SET_AUTH_PERSISTENCE, handleAuth)
];
export default sagaAuth;
