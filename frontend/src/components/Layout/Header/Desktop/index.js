import React from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Notification from '../../../Notifications';
import { logout } from '../../../../utils/auth';

import { TabLink, StyledUl } from './styles';

export default function Desktop({
  notifications,
  showNotifications,
  toggleNotifications,
}) {
  async function handleLogout() {
    await logout();
    document.location.reload();
  }

  return (
    <StyledUl>
      <li>
        <Link to="/register-hackathon" className="create_hackathon">
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
      <li className="logout" onClick={() => handleLogout()}>
        Logout
      </li>
    </StyledUl>
  );
}
