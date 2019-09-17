import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/reactotronConfig';

import history from './services/history';
import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <Router history={history}>
          <Layout component={Routes} />

          <GlobalStyles />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
