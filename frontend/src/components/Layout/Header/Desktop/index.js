import React from 'react';
import { useDispatch } from 'react-redux';
import { FaEnvelope, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logout } from '../../../../utils/auth';
import { reduxLogout } from '../../../../store/modules/auth/actions';

import InvitationCount from '../../../InvitationCount';
import { TabLink, StyledUl } from './styles';

export default function Desktop({ count, history }) {
  const dispatch = useDispatch();

  async function handleLogout() {
    logout();
    dispatch(reduxLogout());
    history.push('/');
  }

  return (
    <StyledUl>
      <li>
        <Link to="/app/register-hackathon" className="create_hackathon">
          Create Hackathon
        </Link>
      </li>
      <li>
        <TabLink
          to="/app/hackathons"
          className="left"
          activeClassName="selected"
        >
          Hackathons
        </TabLink>
        <TabLink to="/app/teams" className="right" activeClassName="selected">
          Teams
        </TabLink>
      </li>
      <li className="notification_container">
        <Link to="/app/invitations">
          {count > 0 ? <InvitationCount count={count} /> : null}
          <FaEnvelope color="#1437E3" size={24} />
        </Link>
      </li>
      <li>
        <Link to="/app/settings">
          <FaCog color="#1437E3" size={24} />
        </Link>
      </li>
      <li className="logout" onClick={() => handleLogout()}>
        Logout
      </li>
    </StyledUl>
  );
}
