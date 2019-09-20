import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Button } from '../../components/Form';
import { Container, TabContainer, Card } from './styles';

export default function HackathonEvent({ match }) {
  const { id } = match.params;
  const [isTeamOwner, setIsTeamOwner] = useState({ state: false, id: '' });
  const [toggleTab, setToggleTav] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadParticipants() {
      const { data } = await api.get(
        `/v1/hackathons/${id}/participants?onlyNoTeam=true?perPage=100`
      );

      setParticipants(data.participants);
    }

    loadParticipants();
  }, []);

  useEffect(() => {
    async function loadIsTeamOwner() {
      const { data } = await api.get(`/v1/me/teams/creator?hackathon_id=${id}`);

      if (data.teams.length > 0)
        setIsTeamOwner({ state: true, id: data.teams[0].id });
    }

    loadIsTeamOwner();
  }, []);

  return (
    <Container>
      <Button
        type="button"
        text={toggleTab ? 'See teams' : 'See participants'}
        onClick={() => setToggleTav(!toggleTab)}
      />
      <Button
        type="button"
        text="Create Team"
        onClick={() => console.log('I will create a team')}
      />

      <TabContainer>
        {toggleTab
          ? participants.map(participant => (
              <Card key={participant.participant.id}>
                <header>
                  <img
                    src={
                      participant.avatar
                        ? participant.avatar.url
                        : DefaultAvatar
                    }
                    alt={`${participant.name}`}
                  />

                  <h2>{participant.participant.name}</h2>
                  <small>{participant.participant.nickname}</small>
                </header>

                <div className="participant_content">
                  <p>{participant.participant.bio}</p>

                  {participant.participant.roles.map(role => (
                    <span className="participant_roles">{role.name}</span>
                  ))}
                </div>

                <div className="participant_actions">
                  <Link
                    target="_blank"
                    to={`/${participant.participant.nickname}`}
                  >
                    Profile
                  </Link>

                  {isTeamOwner.state ? (
                    <Button
                      type="button"
                      text="Invite"
                      onClick={() =>
                        console.log(participant.participant.nickname)
                      }
                    />
                  ) : null}
                </div>
              </Card>
            ))
          : teams.map(team => <h1>xau!</h1>)}
      </TabContainer>
    </Container>
  );
}
