import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import {
  Container,
  CarouselContainer,
  PageContainer,
  CardContainer,
  Card,
} from './styles';

export default function Home() {
  const [hackathons, setHackthons] = useState([]);

  useEffect(() => {
    async function loadHackathons() {
      const { data } = await api.get('/v1/hackathons');

      setHackthons(data.hackathons);
    }

    loadHackathons();
  }, []);

  return (
    <Container>
      <Carousel autoPlay interval={3000} showThumbs={false}>
        {hackathons.map(hackathon => (
          <CarouselContainer key={hackathon.id} url={hackathon.cover.url}>
            <img
              id="cover"
              src={hackathon.cover.url}
              alt={`${hackathon.title} cover`}
            />

            <div className="content_container">
              <h2>{hackathon.title}</h2>
              <h3>{hackathon.subtitle}</h3>

              <div>
                <FaCalendar color="#fff" size={18} />
                <span>{hackathon.event_date}</span>
              </div>

              <div>
                <FaMapMarkerAlt color="#fff" size={18} />
                <span>{hackathon.location}</span>
              </div>

              {hackathon.isParticipant ? (
                <Link to={`hackthon/${hackathon.id}`}>Go to event</Link>
              ) : (
                <Link to={`hackthon/detail/${hackathon.id}`}>Details</Link>
              )}
            </div>
          </CarouselContainer>
        ))}
      </Carousel>

      <PageContainer>
        <h1>Find Hackathons</h1>
        <CardContainer>
          {hackathons.map(hackathon => (
            <Card key={hackathon.id} url={hackathon.cover.url}>
              <header>
                <h2>{hackathon.title}</h2>
              </header>

              <div className="card_content">
                <div>
                  <FaCalendar color="#1437E3" size={18} />
                  <span>{hackathon.event_date}</span>
                </div>

                <div>
                  <FaMapMarkerAlt color="#1437E3" size={18} />
                  <span>{hackathon.location}</span>
                </div>

                {hackathon.isParticipant ? (
                  <Link to={`hackthon/${hackathon.id}`}>Go to event</Link>
                ) : (
                  <Link to={`hackthon/detail/${hackathon.id}`}>Details</Link>
                )}
              </div>
            </Card>
          ))}
        </CardContainer>
      </PageContainer>
    </Container>
  );
}
