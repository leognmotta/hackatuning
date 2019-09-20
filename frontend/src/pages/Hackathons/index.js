import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import DefaultCover from '../../assets/default_cover.jpg';
import Link from '../../components/Link';
import { Button } from '../../components/Form';
import {
  Container,
  Card,
  ParticipantContainer,
  ManageHackathonContainer,
} from './styles';

export default function Hackathons() {
  const [meParticipants, setMeParticipants] = useState([]);
  const [meHackathons, setMeHackathons] = useState([]);

  useEffect(() => {
    async function loadMeParticipants() {
      const { data } = await api.get('/v1/me/participants/hackas');

      setMeParticipants(data.hackathons);
    }

    loadMeParticipants();
  }, []);

  useEffect(() => {
    async function loadMeHackathons() {
      const { data } = await api.get('/v1/me/hackas');

      setMeHackathons(data.hackathons);
    }

    loadMeHackathons();
  }, []);

  async function handleDeleteHackathon(id) {
    try {
      // eslint-disable-next-line no-alert
      const action = window.confirm('Are you sure about that?');

      if (action) {
        await api.delete(`/v1/hackathons/${id}`);

        const newMeHackathons = meHackathons.filter(
          hackathon => hackathon.id !== id
        );

        setMeHackathons(newMeHackathons);

        toast('Hackathon deleted!', {
          className: 'toast-background_success',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar_success',
        });
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
      <h1>My Hackathons</h1>
      <h2 className="heading_section">Manage your hackathons</h2>
      <ManageHackathonContainer>
        {meHackathons.length > 0 ? (
          meHackathons.map(hackathon => (
            <Card
              key={hackathon.id}
              url={hackathon.cover ? hackathon.cover.url : DefaultCover}
            >
              <div className="content">
                <header>
                  <h2>{hackathon.title}</h2>
                </header>

                <div className="card_content">
                  <div>
                    <p className="subtitle">{hackathon.subtitle}</p>
                  </div>

                  <div>
                    <FaRegCalendarAlt color="#1437E3" size={18} />
                    <span>
                      Start:{' '}
                      {format(
                        parseISO(hackathon.event_date),
                        "MMMM dd',' yyyy"
                      )}
                    </span>
                  </div>

                  <div>
                    <FaRegCalendarAlt color="#1437E3" size={18} />
                    <span>
                      End:{' '}
                      {format(
                        parseISO(hackathon.event_ending),
                        "MMMM dd',' yyyy"
                      )}
                    </span>
                  </div>

                  <div className="actions">
                    <Link to={`hackathon/${hackathon.id}/edit`} text="Edit" />
                    <Button
                      text="Delete"
                      color="#E3143E"
                      type="button"
                      onClick={() => handleDeleteHackathon(hackathon.id)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <h3>You do not have any hackathon to manage!</h3>
        )}
      </ManageHackathonContainer>

      <h2 className="heading_section">Participating</h2>
      <ParticipantContainer>
        {meParticipants.length > 0 ? (
          meParticipants.map(participant => (
            <Card
              key={participant.id}
              url={participant.cover ? participant.cover.url : DefaultCover}
            >
              <div className="content">
                <header>
                  <h2>{participant.title}</h2>
                </header>

                <div className="card_content">
                  <div>
                    <p className="subtitle">{participant.subtitle}</p>
                  </div>

                  <div>
                    <FaRegCalendarAlt color="#1437E3" size={18} />
                    <span>
                      Start:{' '}
                      {format(
                        parseISO(participant.event_date),
                        "MMMM dd',' yyyy"
                      )}
                    </span>
                  </div>

                  <div>
                    <FaRegCalendarAlt color="#1437E3" size={18} />
                    <span>
                      End:{' '}
                      {format(
                        parseISO(participant.event_ending),
                        "MMMM dd',' yyyy"
                      )}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`hackathon/${participant.id}`}
                      text="Go to event!"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <h3>You are not participating of any hackathon!</h3>
        )}
      </ParticipantContainer>

      <ToastContainer />
    </Container>
  );
}
