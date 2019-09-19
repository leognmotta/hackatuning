import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../../services/api';

import {
  Container,
  CarouselContainer,
  PageContainer,
  CardContainer,
  Card,
} from './styles';

export default function Home({ history }) {
  const [hackathons, setHackathons] = useState([]);
  const [pagination, setPagination] = useState({});
  const perPage = 8;

  useEffect(() => {
    async function loadHackathons() {
      const searchURLParam = new URLSearchParams(history.location.search);
      const page = searchURLParam.get('page') || 1;

      const { data } = await api.get(
        `/v1/hackathons?perPage=${perPage}&page=${page}`
      );

      setHackathons(data.hackathons);
      setPagination(data.pagination);
    }

    loadHackathons();
  }, [history.location.search]);

  async function handlePageChange(index) {
    const { data } = await api.get(
      `/v1/hackathons?perPage=${perPage}&page=${index.selected + 1}`
    );
    setPagination(data.pagination);
    setHackathons(data.hackathons);
    history.push(`/?page=${index.selected + 1}`);
  }

  return (
    <Container>
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showArrows={false}
      >
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
                <Link to={`hackathon/${hackathon.id}`}>Go to event</Link>
              ) : (
                <Link to={`/hackathon/${hackathon.id}/details`}>Details</Link>
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
                  <Link to={`hackathon/${hackathon.id}`}>Go to event</Link>
                ) : (
                  <Link to={`/hackathon/${hackathon.id}/details`}>Details</Link>
                )}
              </div>
            </Card>
          ))}
        </CardContainer>
      </PageContainer>

      <ReactPaginate
        pageCount={pagination.maxPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        onPageChange={index => handlePageChange(index)}
        containerClassName="pagination-container"
        activeLinkClassName="active"
        nextLabel=">"
        previousLabel="<"
      />
    </Container>
  );
}
