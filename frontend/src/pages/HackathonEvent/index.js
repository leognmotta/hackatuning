import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Button, Input, Select } from '../../components/Form';
import Link from '../../components/Link';
import { Container, TabContainer, Card, Content } from './styles';

export default function HackathonEvent({ match, history }) {
  const perPage = 10;
  const { id } = match.params;
  const [userId, setUserId] = useState();
  const [isTeamOwner, setIsTeamOwner] = useState({ state: false, id: '' });
  const [participants, setParticipants] = useState([]);
  const [pagination, setPagination] = useState({});
  const [roles, setRoles] = useState([]);
  const [select, setSelect] = useState('all');
  const [search, setSearch] = useState('');
  const [hackathon, setHackathon] = useState({ title: '', subtitle: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const searchURLParam = new URLSearchParams(history.location.search);
        const page = searchURLParam.get('page') || 1;

        let shouldSearch = '';

        if (search !== '') shouldSearch = `&search=${search}`;

        const { data } = await api.get(
          `/v1/hackathons/${id}/participants?onlyNoTeam=true&perPage=${perPage}&page=${page}&filterRoles=${select}${shouldSearch}`
        );

        const { data: hacka } = await api.get(`/v1/hackathons/${id}`);

        const response = await api('/v1/validate');

        setHackathon({ title: hacka.title, subtitle: hacka.subtitle });
        setPagination(data.pagination.maxPage);
        setUserId(response.data.id);
        setParticipants(data.participants);
      } catch (error) {
        history.push(`/hackathon/${id}/details`);
      }
    }

    loadData();
  }, [id, history, select, search, isTeamOwner.state]);

  useEffect(() => {
    async function loadIsTeamOwner() {
      const { data } = await api.get(`/v1/me/teams/creator?hackathon_id=${id}`);

      if (data.teams.length > 0)
        setIsTeamOwner({ state: true, id: data.teams[0].id });
    }

    loadIsTeamOwner();
  }, [id]);

  useEffect(() => {
    async function loadRoles() {
      const { data } = await api.get('/v1/roles');

      data.unshift({ id: 'all', name: 'All' });

      setRoles(data);
    }

    loadRoles();
  }, []);

  async function handleCraeteTeam() {
    try {
      const { data } = await api.post(`/v1/teams/hackathons/${id}`);

      setIsTeamOwner({ id: data.id, state: true });

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

  async function handleInviteUser(nickname, index) {
    try {
      await api.post(`/v1/teams/${isTeamOwner.id}/invites/${nickname}`);

      const newParticipants = [...participants];

      newParticipants[index].statusInvite = 'sending';

      setParticipants(newParticipants);

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

  async function handlePageChange(index) {
    let shouldSearch = '';

    if (search !== '') shouldSearch = `&search=${search}`;

    const { data } = await api.get(
      `/v1/hackathons/${id}/participants?onlyNoTeam=true&perPage=${perPage}&page=${index.selected +
        1}&filterRoles=${select}${shouldSearch}`
    );

    setPagination(data.pagination.maxPage);
    setParticipants(data.participants);
    history.push(`/hackathon/${id}?page=${index.selected + 1}`);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);

    history.push(`/hackathon/${id}?page=1`);
  }

  function handleSelectChange(e) {
    setSelect(e.target.value);

    history.push(`/hackathon/${id}?page=1`);
  }

  return (
    <Container>
      <h1>{hackathon.title}</h1>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        {hackathon.subtitle}
      </h2>
      <Content>
        <div className="search" style={{ marginBottom: 20 }}>
          <div className="search__select">
            <Select
              label="Roles:"
              options={roles}
              onChange={e => handleSelectChange(e)}
            />
          </div>

          <div className="search__text">
            <Input
              label="Name, nickname or email:"
              value={search}
              placeholder="Search:"
              onChange={e => handleSearchChange(e)}
            />
          </div>
        </div>

        <div className="buttons">
          <Link
            to={`/hackathon/${id}/teams`}
            text="See All Teams"
            style={{ marginRight: '20px' }}
          />

          {isTeamOwner.state ? (
            <Link
              to={`/hackathon/team/${isTeamOwner.id}/manage`}
              text="Manage Team"
            />
          ) : (
            <Button
              type="button"
              text="Create team"
              onClick={handleCraeteTeam}
            />
          )}
        </div>

        <TabContainer>
          {participants.map((participant, index) => (
            <Card key={participant.participant.id}>
              <div className="tab-content">
                <header>
                  <img
                    src={
                      participant.participant.avatar
                        ? participant.participant.avatar.url
                        : DefaultAvatar
                    }
                    alt={`${participant.name}`}
                  />
                </header>

                <div className="participant_content">
                  <h2>{participant.participant.name}</h2>
                  <small>{participant.participant.nickname}</small>

                  <div className="participants__roles">
                    {participant.participant.roles.map(role => (
                      <span key={role.id} className="participants__items">
                        {role.name}
                      </span>
                    ))}
                  </div>

                  <div className="align-right">
                    <div className="participants__actions">
                      <RouterLink
                        target="_blank"
                        to={`/profile/${participant.participant.nickname}`}
                        className="link"
                      >
                        Full Profile
                      </RouterLink>

                      {isTeamOwner.state &&
                      participant.participant.id !== userId ? (
                        <Button
                          type="button"
                          text={participant.statusInvite ? 'sent' : 'invite'}
                          disabled={!!participant.statusInvite}
                          onClick={() =>
                            handleInviteUser(
                              participant.participant.nickname,
                              index
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabContainer>
      </Content>

      {pagination > 1 ? (
        <ReactPaginate
          pageCount={pagination}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          onPageChange={index => handlePageChange(index)}
          containerClassName="pagination-container"
          activeLinkClassName="active"
          nextLabel="&#10095;"
          previousLabel="&#10094;"
        />
      ) : null}

      <ToastContainer />
    </Container>
  );
}
