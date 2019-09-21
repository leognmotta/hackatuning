import styled from 'styled-components';

import React from 'react';

export const Count = styled.span``;

export default function InvitationCount({ count }) {
  return <Count>{count}</Count>;
}
