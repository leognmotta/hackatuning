import React from 'react';
import { FaCog, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InvitationCount from '../../../InvitationCount';
import { logout } from '../../../../utils/auth';

import { StyledUl } from './styles';

export default function Desktop({ count }) {
  async function handleLogout() {
    await logout();
    document.location.reload();
  }

  function handleSettings() {
    const { display } = document.getElementById('ui__subtab').style;

    if (!display || display === 'none') {
      document.getElementById('ui__subtab').style.display = 'block';
    } else {
      document.getElementById('ui__subtab').style.display = 'none';
    }
  }

  return (
    <StyledUl>
      <li>
        <Link className="create_hackathon" to="/app/register-hackathon">
          Create Hackathon
        </Link>
      </li>
      <li className="notification_container">
        <Link to="/app/invitations">
          {count > 0 ? <InvitationCount count={count} /> : null}
          <FaEnvelope color="#1437E3" size={24} />
        </Link>
      </li>
      <li style={{ position: 'relative' }} onClick={() => handleSettings()}>
        <FaCog color="#1437E3" size={24} />

        <ul className="ui__sub" id="ui__subtab">
          <li className="ui__subitem">
            <div className="arrow-up" />
            <Link className="ui__sublink" to="/app/settings">
              Edit Profile
            </Link>
          </li>

          <li className="ui__subitem">
            <a className="ui__sublink" onClick={() => handleLogout()}>
              Logout
            </a>
          </li>
        </ul>
      </li>
    </StyledUl>
  );
}
