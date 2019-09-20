import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const SyledLink = styled(RouterLink)`
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  color: #fff;
  background: transparent
    linear-gradient(127deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 6px;

  &:visited {
    color: #fff;
  }
`;

export default function Link({ text = 'text', to = '/route', ...props }) {
  return (
    <SyledLink to={to} {...props}>
      {text}
    </SyledLink>
  );
}
