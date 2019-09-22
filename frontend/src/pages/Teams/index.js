import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';
import { FaExternalLinkAlt, FaUserCircle, FaUsers } from 'react-icons/fa';

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
import { CardTeam } from '../../components/Card/styles';

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
    }

    loadData();
  }, []);

  function filterManageTeam(id) {
    const newManageTeams = manageTeams.filter(team => team.id !== id);

    setManageTeams(newManageTeams);
  }

  async function handleTeamDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const action = window.confirm('Are you sure about that?');

      if (action) {
        await api.delete(`/v1/teams/${id}`);

        toast('Team was deleted!', {
          className: 'toast-background-success',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar-success',
        });

        filterManageTeam(id);
      }
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
      <h1 style={{ textAlign: 'center' }}>My Teams</h1>
      <h2 className="heading_section">Manage your teams</h2>

      <ManageTeamsContainer>
        {manageTeams.length > 0 ? (
          manageTeams.map(team => (
            <div className="box">
              <CardTeam key={team.id}>
                <div className="team-id">
                  <p>{String(team.id).padStart(3, '0')}</p>
                </div>

                <div className="team-content">
                  <p className="title">
                    Team of {''}
                    <strong>{team.hackathon.title}</strong>
                  </p>

                  <div className="container">
                    <div className="creator">
                      Created by{' '}
                      <RouterLink
                        target="_blank"
                        to={`/profile/${team.creator.nickname}`}
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
                      {team.members.length > 0
                        ? ''
                        : 'This team has no members yet'}
                      {team.members.map(member => (
                        <RouterLink
                          target="_blank"
                          to={`/profile/${member.nickname}`}
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
                    <Link
                      to={`/hackathon/team/${team.id}/manage`}
                      text="edit"
                      style={{ marginLeft: '15px' }}
                    />
                    <Button
                      text="Delete"
                      color="#e3133e"
                      style={{ marginLeft: '15px' }}
                      onClick={() => handleTeamDelete(team.id)}
                    />
                  </div>
                </div>
              </CardTeam>
            </div>
          ))
        ) : (
          <h3>No teams to manage</h3>
        )}
      </ManageTeamsContainer>

      <h2 className="heading_section">Teams i participate</h2>
      <TeamsContainer>
        {teams.length > 0 ? (
          teams.map(team => (
            <div className="box">
              <CardTeam key={team.team_id}>
                <div className="team-id">
                  <p>{String(team.team_id).padStart(3, '0')}</p>
                </div>

                <div className="team-content">
                  <p className="title">
                    Team of {''}
                    <strong>{team.team.hackathon.title}</strong>
                  </p>

                  <div className="container">
                    <div className="creator">
                      Created by{' '}
                      <RouterLink
                        target="_blank"
                        to={`/profile/${team.team.creator.nickname}`}
                        className="link"
                      >
                        {team.team.creator.name}
                      </RouterLink>
                    </div>

                    <div className="members">
                      <FaUsers />
                      <strong>Members:</strong>
                    </div>

                    <div className="member">
                      {team.team.members.length > 0
                        ? ''
                        : 'This team has no members yet'}
                      {team.team.members.map(member => (
                        <RouterLink
                          target="_blank"
                          to={`/profile/${member.nickname}`}
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
                    <Link
                      to={`hackathon/${team.team.hackathon.id}`}
                      text="Go To Event"
                    />
                  </div>
                </div>
              </CardTeam>
            </div>
          ))
        ) : (
          <h3>No teams</h3>
        )}
      </TeamsContainer>

      <ToastContainer />
    </Container>
  );
}
