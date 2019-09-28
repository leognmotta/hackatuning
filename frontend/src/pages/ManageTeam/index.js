import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';
import { FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../../components/Form';
import { Container } from './styles';
import { CardTeam } from '../../components/Card/styles';

export default function ManageTeam({ match }) {
  const { id } = match.params;
  const [team, setTeam] = useState({ creator: { name: '' }, members: [] });

  useEffect(() => {
    async function loadTeam() {
      const { data } = await api.get(`/v1/teams/${id}`);

      setTeam(data);
    }

    loadTeam();
  }, [id]);

  function filterTeam(memberId) {
    const newMembers = team.members.filter(member => member.id !== memberId);

    setTeam({ ...team, members: newMembers });
  }

  async function handleDeleteMember(teamId, memberId, name) {
    try {
      await api.delete(`/v1/teams/${teamId}/participants/${memberId}`);

      toast(`${name} was deleted from the team!`, {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });

      filterTeam(memberId);
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
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Manage Team</h1>
      <CardTeam key={team.id}>
        <div className="team-id">
          <p>{String(team.id).padStart(3, '0')}</p>
        </div>

        <div className="team-content">
          <div className="container">
            <div className="creator">
              Created by{' '}
              <RouterLink
                target="_blank"
                to={`/${team.creator.nickname}`}
                className="link"
              >
                {team.creator.name}
              </RouterLink>
            </div>

            <div className="members">
              <FaUsers />
              <strong>Members:</strong>
            </div>

            <div className="member">
              {team.members.length > 0 ? '' : 'This team has no members yet'}

              {team.members.map(member => (
                <div key={member.id} className="member__item">
                  <strong>Name:</strong>
                  <p>{member.name}</p>
                  <div className="actions actions--left">
                    <RouterLink
                      target="_blank"
                      to={`/${member.nickname}`}
                      className="link"
                      style={{ marginRight: '20px' }}
                    >
                      Profile
                      <FaExternalLinkAlt class="external" size={15} />
                    </RouterLink>

                    <Button
                      color="#e3133e"
                      text="Delete"
                      onClick={() =>
                        handleDeleteMember(team.id, member.id, member.name)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardTeam>

      <ToastContainer />
    </Container>
  );
}
