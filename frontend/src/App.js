import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>

      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
