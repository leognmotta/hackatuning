import React from 'react';
import { FaCog } from 'react-icons/fa';
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
        <button className="create_hackathon btn" type="button">
          Create Hackathon
        </button>
      </li>
      <li className="notification_container">
        <Notification
          notifications={notifications}
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
        />
      </li>
      <li>
        <FaCog color="#1437E3" size={22} />
      </li>
    </StyledUl>
  );
}
