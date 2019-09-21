import React from 'react';
import { FaCog, FaHome, FaPlus, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import InvitationCount from '../../../InvitationCount';

import { StyledUl, NotificationContianer } from './styles';

export default function Desktop({ count }) {
  return (
    <>
      <NotificationContianer>
        <NavLink to="/invitations">
          {count > 0 ? <InvitationCount count={count} /> : null}
          <FaEnvelope color="#1437E3" size={24} />
        </NavLink>
      </NotificationContianer>

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
            <span>Add Hackathon</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="selected">
            <FaCog color="#1437E3" size={22} />
            <span>Settings</span>
          </NavLink>
        </li>
      </StyledUl>
    </>
  );
}
