import React from 'react';
import { FaCog, FaHome, FaPlus, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import InvitationCount from '../../../InvitationCount';
import { logout } from '../../../../utils/auth';

import { StyledUl, NotificationContianer } from './styles';

export default function Desktop({ count }) {
  async function handleLogout() {
    await logout();
    document.location.reload();
  }

  function handleSettings() {
    const { display } = document.getElementById('ui__sub').style;

    if (!display || display === 'none') {
      document.getElementById('ui__sub').style.display = 'block';
    } else {
      document.getElementById('ui__sub').style.display = 'none';
    }
  }

  return (
    <>
      <NotificationContianer>
        <NavLink to="/app/invitations">
          {count > 0 ? <InvitationCount count={count} /> : null}
          <FaEnvelope color="#1437E3" size={24} />
        </NavLink>
      </NotificationContianer>

      <StyledUl>
        <li>
          <NavLink className="ui__item" to="/" exact activeClassName="selected">
            <FaHome color="#1437E3" size={22} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="ui__item"
            to="/app/register-hackathon"
            activeClassName="selected"
          >
            <FaPlus color="#1437E3" size={22} />
            <span>Add Hackathon</span>
          </NavLink>
        </li>
        <li onClick={() => handleSettings()}>
          <div className="ui__item ui__item--relative">
            <FaCog color="#1437E3" size={22} />
            <span>Settings</span>

            <ul className="ui__sub" id="ui__sub">
              <li className="ui__subitem">
                <NavLink
                  className="ui__sublink"
                  to="/app/settings"
                  activeClassName="selected"
                >
                  Edit Profile
                </NavLink>
              </li>

              <li className="ui__subitem">
                <a className="ui__sublink" onClick={() => handleLogout()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </StyledUl>
    </>
  );
}
