import React, { useEffect, useState } from 'react';
import { FaUsers, FaExternalLinkAlt, FaUserCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../services/api';
import Link from '../../components/Link';

import { CardTeam } from '../../components/Card/styles';
import { Container, TeamContainer } from './styles';

export default function SeeAllTeams({ history, match }) {
  const { id } = match.params;
  const [teams, setTeams] = useState([]);
  const [hackathon, setHackathon] = useState({});

  useEffect(() => {
    async function laodteams() {
      try {
        const { data } = await api.get(`/v1/teams/hackathons/${id}`);
        const { data: hackResponse } = await api.get(`/v1/hackathons/${id}`);

        setHackathon(hackResponse);
        setTeams(data.teams);
      } catch (error) {
        history.push('/');
      }
    }

    laodteams();
  }, [id]);

  return (
    <Container>
      <h1>{hackathon.title}</h1>
      <h2>{hackathon.subtitle}</h2>

      <div className="buttons">
        <Link
          to={`/hackathon/${id}`}
          text="See all participants"
          style={{ marginRight: '20px' }}
        />
      </div>

      <TeamContainer>
        {teams.map(team => (
          <CardTeam>
            <div className="team-id">
              <p>{String(team.id).padStart(3, '0')}</p>
            </div>

            <div className="team-content">
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
                      <FaUserCircle className="link" size={25} /> {member.name}{' '}
                      <FaExternalLinkAlt class="external" size={15} />
                    </RouterLink>
                  ))}
                </div>
              </div>
            </div>
          </CardTeam>
        ))}
      </TeamContainer>
    </Container>
  );
}
