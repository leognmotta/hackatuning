import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

export default function DefaultLayout({ children }) {
  return <Container>{children}</Container>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
