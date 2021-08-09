import { all } from 'redux-saga/effects';
import auth from './authSaga';
import category from './categorySaga';
import brand from './brandSaga';
import product from './productSaga';
export default function* root() {
  yield all([...auth, ...category, ...brand, ...product]);
}
