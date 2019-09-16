import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { TabLink, StyledUl } from './styles';

export default function Desktop() {
  return (
    <StyledUl>
      <li>
        <Link to="register-hackathon" className="create_hackathon">
          Create Hackathon
        </Link>
      </li>
      <li>
        <TabLink to="/hackathons" className="left" activeClassName="selected">
          Hackathons
        </TabLink>
        <TabLink to="/teams" className="right" activeClassName="selected">
          Teams
        </TabLink>
      </li>
      <li>
        <FaBell color="#1437E3" size={24} />
      </li>
      <li>
        <FaCog color="#1437E3" size={24} />
      </li>
      <li>Logout</li>
    </StyledUl>
  );
}
