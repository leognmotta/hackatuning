/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPenAlt,
  FaUsers,
  FaRegCalendarAlt,
  FaTrophy,
} from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadScreen';
import api from '../../services/api';
import { Form, Button } from '../../components/Form';
import Link from '../../components/Link';
import 'react-datepicker/dist/react-datepicker.css';

import DefaultCover from '../../assets/default_cover.jpg';
import DefaultAvatar from '../../assets/default-user-image.png';
import { Container } from './styles';
import { isAuthenticated } from '../../utils/auth';

export default function Details({ match, history }) {
  const [loading, setLoading] = useState(true);
  const hackathonId = match.params.id;
  const [hackathon, setHackathon] = useState({
    cover: { url: '' },
    organizer: { name: '', avatar: { url: '' } },
  });

  useEffect(() => {
    async function loadHackathon() {
      const { data } = await api.get(`/v1/hackathons/${hackathonId}`);

      data.event_date = format(parseISO(data.event_date), 'MM/dd/yyyy');
      data.event_ending = format(parseISO(data.event_ending), 'MM/dd/yyyy');

      data.deadline_subscription = format(
        parseISO(data.deadline_subscription),
        'MM/dd/yyyy'
      );

      data.deadline_team_creation = format(
        parseISO(data.deadline_team_creation),
        'MM/dd/yyyy'
      );

      setHackathon(data);
      setLoading(false);
    }

    loadHackathon();
  }, [hackathonId]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isAuthenticated()) {
        await api.post(`/v1/hackathons/${hackathonId}/participants`);

        history.push(`/app/hackathon/${hackathonId}`);
      } else {
        history.push(`/app/login`);
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

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container url={hackathon.cover ? hackathon.cover.url : DefaultCover}>
      <div className="image_container">
        <div className="header__text">
          <h1>{hackathon.title}</h1>
          <div className="organizer">
            <h2>
              <span>Organized by</span>
              <img
                src={
                  hackathon.organizer.avatar
                    ? hackathon.organizer.avatar.url
                    : DefaultAvatar
                }
                alt={hackathon.organizer.name}
              />
              <strong>{hackathon.organizer.name}</strong>
            </h2>
          </div>
        </div>

        <div className="header__button">
          {isAuthenticated() ? (
            hackathon.isParticipant ? (
              <Link to={`/app/hackathon/${hackathon.id}`} text="Go to event" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Button
                  text="Subscribe"
                  style={{ width: 240, margin: '20px auto' }}
                />
              </Form>
            )
          ) : (
            <Form onSubmit={handleSubmit}>
              <Button
                text="Sign In"
                style={{ width: 240, margin: '20px auto' }}
              />
            </Form>
          )}
        </div>
      </div>

      <div className="details">
        <div className="details__photo">
          <img
            id="cover"
            src={hackathon.cover ? hackathon.cover.url : DefaultCover}
            alt={`${hackathon.title} cover`}
          />

          <div className="details__awards">
            <FaTrophy size={47} />
            <p>
              {hackathon.awards
                ? hackathon.awards
                : 'The creator of this hackathon has not reported any awards!'}
            </p>
          </div>
        </div>

        <div className="details__desc">
          <div className="details__dates">
            <div>
              <FaPenAlt />
              <span>
                Registrations: until {hackathon.deadline_subscription}
              </span>
            </div>

            <div>
              <FaUsers />
              <span>
                Create teams: until {hackathon.deadline_team_creation}
              </span>
            </div>

            <div>
              <FaRegCalendarAlt />
              <span>
                Event: {hackathon.event_date} to {hackathon.event_ending}
              </span>
            </div>

            <div>
              <FaMapMarkerAlt />
              <span>{!hackathon.online ? hackathon.location : 'Online'}</span>
            </div>
          </div>

          <div className="details__text">
            <h3>{hackathon.subtitle}</h3>
            <p>{hackathon.description}</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
}
