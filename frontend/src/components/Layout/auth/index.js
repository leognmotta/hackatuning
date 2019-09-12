import React from 'react';
import PropTypes from 'prop-types';

// import { Container } from './style';

export default function AuthLayout({ childComponent: Component, ...props }) {
  return <Component {...props} />;
}

// AuthLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };
