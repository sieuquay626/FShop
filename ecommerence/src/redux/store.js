import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddle();
export const middlewares = [sagaMiddleware, logger];

const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: 100
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
