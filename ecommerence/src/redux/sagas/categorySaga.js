import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/category';
import types from '../actions/types';
import { category_api } from '../../api/category';

function* handleCategory() {
  try {
    const result = yield call(category_api);
    yield put(actions.handleCategorySuccess(result.data));
  } catch (error) {
    yield put(actions.handleCategoryError());
  }
}

const sagaCategory = [takeEvery(types.GET_LIST_CATEGORIES, handleCategory)];
export default sagaCategory;
