import styled from 'styled-components';

import React from 'react';

export const Count = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 18px;
  min-width: 18px;
  background-color: red;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  right: -5px;
  top: -8px;
`;

export default function InvitationCount({ count }) {
  return count ? <Count>{count}</Count> : '';
}
