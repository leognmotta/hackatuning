import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './style';

export default function DefaultLayout({ childComponent: Component, ...props }) {
  return <Component {...props} />;
}

// DefaultLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };
