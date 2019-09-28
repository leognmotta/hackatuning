import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaUsers, FaExternalLinkAlt, FaUserCircle } from 'react-icons/fa';
import LoadingScreen from 'react-loading-screen';
import { NProgress } from '@tanem/react-nprogress';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/Form';
import { CardTeam } from '../../components/Card/styles';
import { Container, Content } from './styles';

export default function Invitations() {
  const [loading, setLoading] = useState(true);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    async function loadInvites() {
      setTimeout(async () => {
        const { data } = await api.get('/v1/teams/invites/me');

        setInvites(data);
      }, 10000);
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
    <NProgress isAnimating>
      {() => (
        <Container>
          <Content>
            {invites.length > 0 ? (
              invites.map(invite => (
                <CardTeam key={invite.id}>
                  <div className="team-id">
                    <p>{String(invite.team_id).padStart(3, '0')}</p>
                  </div>

                  <div className="team-content">
                    <p className="title">
                      Team of {''}
                      <strong>{invite.team.hackathon.title}</strong>
                    </p>

                    <div className="container">
                      <div className="creator">
                        Created by{' '}
                        <RouterLink
                          target="_blank"
                          to={`/${invite.team.creator.nickname}`}
                          className="link"
                        >
                          {invite.team.creator.name}
                        </RouterLink>
                      </div>

                      <div className="members">
                        <FaUsers />
                        <strong>Members:</strong>
                      </div>

                      <div className="member">
                        {invite.team.members.length > 0
                          ? ''
                          : 'This team has no members yet'}
                        {invite.team.members.map(member => (
                          <RouterLink
                            target="_blank"
                            to={`/${member.nickname}`}
                            className="member__link"
                          >
                            <FaUserCircle className="link" size={25} />{' '}
                            {member.name}{' '}
                            <FaExternalLinkAlt class="external" size={15} />
                          </RouterLink>
                        ))}
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
                        style={{ marginLeft: '15px' }}
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
                </CardTeam>
              ))
            ) : (
              <h1>No invites</h1>
            )}
          </Content>
          <ToastContainer />
        </Container>
      )}
    </NProgress>
  );
}
