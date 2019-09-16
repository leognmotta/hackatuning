import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';

import { StyledUl } from './styles';

export default function Desktop() {
  return (
    <StyledUl>
      <li>
        <button className="create_hackathon btn" type="button">
          Create Hackathon
        </button>
      </li>
      <li>
        <FaBell color="#1437E3" size={22} />
      </li>
      <li>
        <FaCog color="#1437E3" size={22} />
      </li>
    </StyledUl>
  );
}
