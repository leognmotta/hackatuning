import React from 'react';
import { FaCog, FaHome, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Notification from '../../../Notifications';

import { StyledUl, NotificationContianer } from './styles';

export default function Desktop({
  notifications,
  showNotifications,
  toggleNotifications,
}) {
  return (
    <>
      <NotificationContianer>
        <Notification
          notifications={notifications}
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
        />
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
