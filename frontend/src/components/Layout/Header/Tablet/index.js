import React from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Notification from '../../../Notifications';

import { StyledUl } from './styles';

export default function Desktop({
  notifications,
  showNotifications,
  toggleNotifications,
}) {
  return (
    <StyledUl>
      <li>
        <Link className="create_hackathon" to="register-hackathon">
          Create Hackathon
        </Link>
      </li>
      <li className="notification_container">
        <Notification
          notifications={notifications}
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
        />
      </li>
      <li>
        <Link to="/settings">
          <FaCog color="#1437E3" size={24} />
        </Link>
      </li>
    </StyledUl>
  );
}
