import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/brand';
import types from '../actions/types';
import { brand_api } from '../../api/brand';

function* handleBrand() {
  try {
    const result = yield call(brand_api);
    yield put(actions.handleBrandSuccess(result.data));
  } catch (error) {
    yield put(actions.handleBrandError());
  }
}
const sagaBrand = [takeEvery(types.GET_LIST_BRANDS, handleBrand)];
export default sagaBrand;
