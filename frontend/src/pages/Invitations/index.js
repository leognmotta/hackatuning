import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../../components/Form';
import { Container } from './styles';

export default function Invitations() {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    async function loadInvites() {
      const { data } = await api.get('/v1/teams/invites/me');

      setInvites(data);
    }

    loadInvites();
  }, []);

  function filterInvites(id) {
    const newInvites = invites.filter(
      invite => invite.team.hackathon.id !== id
    );

    setInvites(newInvites);
  }

  async function handleAccept(id, team, hackathon) {
    try {
      await api.put(`/v1/teams/invites/${id}`);

      toast(`You are now part of team ${team}`, {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });

      filterInvites(hackathon);
    } catch (error) {
      toast(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message,
        {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        }
      );
    }
  }

  async function handleDecline(id, team, hackathon) {
    try {
      await api.put(`/v1/teams/invites/${id}`, {
        denied: true,
      });

      toast(`You Declined the invitation from team ${team}`, {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });

      filterInvites(hackathon);
    } catch (error) {
      toast(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message,
        {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        }
      );
    }
  }

  return (
    <Container>
      {invites.length > 0 ? (
        invites.map(invite => (
          <div key={invite.id}>
            <h2>
              Invites from team {invite.id} of {''}
              {invite.team.hackathon.title} event!
            </h2>

            <div className="team-container">
              <div className="creator">
                <strong>Creator:</strong> {invite.team.creator.name}
                {invite.team.creator.roles.map(role => (
                  <span key={role.id} style={{ margin: 5 }} className="role">
                    {role.name}
                  </span>
                ))}
              </div>

              <div className="members">
                <strong>Team:</strong>
              </div>
            </div>

            <div className="actions">
              <Button
                text="Accecpt"
                onClick={() =>
                  handleAccept(
                    invite.id,
                    invite.team_id,
                    invite.team.hackathon.id
                  )
                }
              />
              <Button
                color="#e3133e"
                text="Decline"
                onClick={() =>
                  handleDecline(
                    invite.id,
                    invite.team_id,
                    invite.team.hackathon.id
                  )
                }
              />
            </div>
          </div>
        ))
      ) : (
        <h1>No invites</h1>
      )}

      <ToastContainer />
    </Container>
  );
}
