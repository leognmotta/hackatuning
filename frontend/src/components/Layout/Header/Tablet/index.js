import React from 'react';
import { FaCog, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InvitationCount from '../../../InvitationCount';

import { StyledUl } from './styles';

export default function Desktop({ count }) {
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
      <li>
        <Link to="/app/settings">
          <FaCog color="#1437E3" size={24} />
        </Link>
      </li>
    </StyledUl>
  );
}
