import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Dotenv from 'dotenv';
// import Main from './components';
import AppRouter from './routers/AppRouter';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './bootstrap.css';
import('./scss/index.scss');

function App() {
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Main /> */}
          <AppRouter />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
