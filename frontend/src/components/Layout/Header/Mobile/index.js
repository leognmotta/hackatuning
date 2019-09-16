import React from 'react';
import { FaBell, FaCog, FaHome, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { StyledUl } from './styles';

export default function Desktop() {
  return (
    <StyledUl>
      <li>
        <NavLink to="/" exact activeClassName="selected">
          <FaHome color="#1437E3" size={22} />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register-hackathon" activeClassName="selected">
          <FaPlus color="#1437E3" size={22} />
          <span>Add</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/notifications" activeClassName="selected">
          <FaBell color="#1437E3" size={22} />
          <span>Notification</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" activeClassName="selected">
          <FaCog color="#1437E3" size={22} />
          <span>Setting</span>
        </NavLink>
      </li>
    </StyledUl>
  );
}
