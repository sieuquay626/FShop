import { call, put, takeEvery } from 'redux-saga/effects';
import types from '../actions/types';
import {
  polular_product_api,
  arrvial_product_api,
  toprate_product_api,
  gender_product_api
} from '../../api/product';

import * as actions from '../actions/product';

function* handlePopularProduct({ filter }) {
  try {
    const result = yield call(polular_product_api, filter);
    yield put(actions.handlePopularProductSuccess(result.data));
  } catch (error) {
    yield put(actions.handlePopularProductSuccess(error));
  }
}
function* handleArrivalProduct({ filter }) {
  try {
    const result = yield call(arrvial_product_api, filter);
    yield put(actions.handleArrivalProductSuccess(result.data));
  } catch (error) {
    yield put(actions.handleArrivalProductError(error));
  }
}

function* handleToprateProduct({ filter }) {
  try {
    const result = yield call(toprate_product_api, filter);
    yield put(actions.handleToprateProductSuccess(result.data));
  } catch (error) {
    yield put(actions.handleToprateProductError(error));
  }
}

function* handleGenderProduct({ payload }) {
  try {
    const result = yield call(gender_product_api, payload);
    yield put(actions.handleGenderProductSuccess(result.data));
  } catch (error) {
    yield put(actions.handleGenderProductError(error));
  }
}
const sagaProduct = [
  takeEvery(types.GET_POPULAR_PRODUCTS, handlePopularProduct),
  takeEvery(types.GET_ARRIVAL_PRODUCTS, handleArrivalProduct),
  takeEvery(types.GET_TOP_RATE_PRODUCTS, handleToprateProduct),
  takeEvery(types.GET_GENDER_PRODUCTS, handleGenderProduct)
];

export default sagaProduct;
