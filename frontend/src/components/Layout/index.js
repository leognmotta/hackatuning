import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ component: Component, ...props }) {
  return (
    <>
      <Header />
      <main>
        <Component {...props} test="ola" />
      </main>
      <Footer />
    </>
  );
}
