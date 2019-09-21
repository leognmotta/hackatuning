import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../../components/Form';
import Link from '../../components/Link';
import {
  Container,
  ManageTeamsContainer,
  TeamsContainer,
  Card,
} from './styles';

export default function Teams() {
  const [manageTeams, setManageTeams] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: manageTeamsResponse } = await api.get(
        '/v1/me/teams/creator'
      );
      const { data: teamsResponse } = await api.get('/v1/me/teams/member');

      setManageTeams(manageTeamsResponse.teams);
      setTeams(teamsResponse.teams);

      console.log(teamsResponse.teams);
    }

    loadData();
  }, []);

  function filterManageTeam(id) {
    const newManageTeams = manageTeams.filter(team => team.id !== id);

    setManageTeams(newManageTeams);
  }

  async function handleTeamDelete(id) {
    try {
      await api.delete(`/v1/teams/${id}`);

      toast('Team was deleted!', {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });

      filterManageTeam(id);
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
      <ManageTeamsContainer>
        <h2>Manage Teams</h2>

        {manageTeams.length > 0 ? (
          manageTeams.map(team => (
            <Card key={team.id}>
              <div className="content">
                <h3>Team {team.id}</h3>
                <strong>Members:</strong> {team.members.length + 1}
              </div>

              <div className="actions">
                <Link to={`/hackathon/${team.id}/manage`} text="edit" />
                <Button
                  text="Delete"
                  color="#e3133e"
                  onClick={() => handleTeamDelete(team.id)}
                />
              </div>
            </Card>
          ))
        ) : (
          <h3>No teams to manage</h3>
        )}
      </ManageTeamsContainer>

      <TeamsContainer>
        <h2>Teams</h2>

        {teams.length > 0 ? (
          teams.map(team => (
            <Card key={team.team.id}>
              <h3>Team {team.team.id}</h3>

              <div className="creator">
                <strong>Creator:</strong> {team.team.creator.name}
                {team.team.creator.roles.map(role => (
                  <span key={role.id} style={{ margin: 5 }} className="role">
                    {role.name}
                  </span>
                ))}
              </div>

              <div className="members">
                {team.team.members.map(member => (
                  <div key={member.id}>
                    <strong>Name:</strong> {member.name}
                    {member.roles.map(role => (
                      <span
                        key={role.id}
                        style={{ margin: 5 }}
                        className="role"
                      >
                        {role.name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          ))
        ) : (
          <h3>No teams</h3>
        )}
      </TeamsContainer>

      <ToastContainer />
    </Container>
  );
}
