import React, { useEffect, useState } from 'react';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../services/api';

import { Container } from './styles';

export default function Details({ match }) {
  const [hackathon, setHackathon] = useState({
    cover: { url: '' },
    organizer: { name: '', avatar: { url: '' } },
  });

  useEffect(() => {
    async function loadHackathon() {
      const hackathonId = match.params.id;

      const { data } = await api.get(`/v1/hackathons/${hackathonId}`);

      setHackathon(data);
    }

    loadHackathon();
  }, [match.params.id]);

  return (
    <Container url={hackathon.cover.url}>
      <div className="image_container">
        <h1>{hackathon.title}</h1>
        <h2>{hackathon.subtitle}</h2>
        <span>
          <FaCalendar /> {hackathon.event_date}
        </span>
        <span>
          <FaMapMarkerAlt />{' '}
          {hackathon.location ? hackathon.location : 'online'}
        </span>
      </div>

      <div className="details">
        <div>
          <strong>About:</strong>
          <p>{hackathon.description}</p>
        </div>

        <div>
          <strong>Date:</strong>
          <p>{hackathon.event_date}</p>
        </div>

        <div>
          <strong>Subscription:</strong>
          <p>You can subscribe until {hackathon.event_date}</p>
        </div>

        <div>
          <strong>End date:</strong>
          <p>{hackathon.event_ending}</p>
        </div>

        <div>
          <strong>Awards:</strong>
          <p>{hackathon.awards}</p>
        </div>
      </div>

      <div className="organizer">
        <h2>
          {hackathon.title} is an envent by {hackathon.organizer.name}
        </h2>

        <img
          src={hackathon.organizer.avatar.url}
          alt={hackathon.organizer.name}
        />
      </div>
    </Container>
  );
}
