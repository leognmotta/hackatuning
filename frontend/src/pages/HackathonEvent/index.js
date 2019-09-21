import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Button } from '../../components/Form';
import Link from '../../components/Link';
import { Container, TabContainer, Card } from './styles';

export default function HackathonEvent({ match, history }) {
  const { id } = match.params;
  const [isTeamOwner, setIsTeamOwner] = useState({ state: false, id: '' });
  const [toggleTab, setToggleTav] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get(
          `/v1/hackathons/${id}/participants?onlyNoTeam=${true}`
        );

        const { data: members } = await api(`/v1/teams/hackathons/${id}`);

        setTeams(members.teams);

        setParticipants(data.participants);
      } catch (error) {
        history.push(`/hackathon/${id}/details`);
      }
    }

    loadData();
  }, [id]);

  useEffect(() => {
    async function loadIsTeamOwner() {
      const { data } = await api.get(`/v1/me/teams/creator?hackathon_id=${id}`);

      if (data.teams.length > 0)
        setIsTeamOwner({ state: true, id: data.teams[0].id });
    }

    loadIsTeamOwner();
  }, [id]);

  async function handleCraeteTeam() {
    // eslint-disable-next-line no-alert
    window.confirm(
      'If you create a team, you can invite participants, but will not be available to be invited unless you delete the team, are you sure?'
    );

    try {
      await api.post(`/v1/teams/hackathons/${id}`);

      setIsTeamOwner({ ...isTeamOwner, state: true });

      toast('You have created your team, you can now invite participants!', {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });
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

  async function handleInviteUser(nickname) {
    try {
      await api.post(`/v1/teams/${isTeamOwner.id}/invites/${nickname}`);

      toast(`${nickname} was invited!`, {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });
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
      <Button
        type="button"
        text={toggleTab ? 'See teams' : 'See participants'}
        onClick={() => setToggleTav(!toggleTab)}
      />

      {isTeamOwner.state ? (
        <Link to={`/hackathon/${id}/manage`} text="Manage Team" />
      ) : (
        <Button type="button" text="Create team" onClick={handleCraeteTeam} />
      )}

      <TabContainer>
        {toggleTab
          ? participants.map(participant => (
              <Card key={participant.participant.id}>
                <header>
                  <img
                    src={
                      participant.participant.avatar
                        ? participant.participant.avatar.url
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
                    <span key={role.id} className="participant_roles">
                      {role.name}
                    </span>
                  ))}
                </div>

                <div className="participant_actions">
                  <RouterLink
                    target="_blank"
                    to={`/${participant.participant.nickname}`}
                  >
                    Profile
                  </RouterLink>

                  {isTeamOwner.state ? (
                    <Button
                      type="button"
                      text="Invite"
                      onClick={() =>
                        handleInviteUser(participant.participant.nickname)
                      }
                    />
                  ) : null}
                </div>
              </Card>
            ))
          : teams.map(team => (
              <Card key={team.id}>
                <div className="team_content">
                  <h2>{team.id}</h2>
                  <strong>Creator:</strong>
                  <span>{team.creator.name}</span>

                  <strong>Members:</strong>
                  <span>{team.members.length + 1}</span>
                </div>
              </Card>
            ))}
      </TabContainer>

      <ToastContainer />
    </Container>
  );
}
