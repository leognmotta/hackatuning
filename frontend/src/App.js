// comment
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/reactotronConfig';

import history from './services/history';
import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './Routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Routes />
          <GlobalStyles />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
