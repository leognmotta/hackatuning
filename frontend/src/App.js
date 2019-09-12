import React from 'react';
import { Router } from 'react-router-dom';

import history from './services/history';
import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <Layout component={Routes} />

      <GlobalStyles />
    </Router>
  );
}

export default App;
