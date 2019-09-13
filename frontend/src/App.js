import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/reactotronConfig';

import history from './services/history';
import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout component={Routes} />

        <GlobalStyles />
      </Router>
    </Provider>
  );
}

export default App;
