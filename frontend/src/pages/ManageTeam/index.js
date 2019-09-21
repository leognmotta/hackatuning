import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../../components/Form';
import { Container } from './styles';

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
      <h1>Team {team.id}</h1>
      <strong>Creator:</strong> {team.creator.name}
      {team.members.map(member => (
        <div key={member.id}>
          <strong>Name:</strong> {member.name}
          <div className="actions">
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
      <ToastContainer />
    </Container>
  );
}
