import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../../services/api';

import DefaultCover from '../../assets/default_cover.jpg';
import {
  Container,
  CarouselContainer,
  PageContainer,
  CardContainer,
  Card,
} from './styles';

export default function Home({ history }) {
  const [hackaCarousel, setHackaCarousel] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [pagination, setPagination] = useState({});
  const perPage = 8;

  useEffect(() => {
    async function loadHackathons() {
      const searchURLParam = new URLSearchParams(history.location.search);
      const page = searchURLParam.get('page') || 1;

      const { data: dataCarousel } = await api.get(
        `/v1/hackathons?perPage=${perPage}&page=${page}&featured=3`
      );

      const { data } = await api.get(
        `/v1/hackathons?perPage=${perPage}&page=${page}&noFeatured=3`
      );

      setHackaCarousel(dataCarousel.hackathons);
      setHackathons(data.hackathons);
      setPagination(data.pagination);
    }

    loadHackathons();
  }, [history.location.search]);

  async function handlePageChange(index) {
    const { data } = await api.get(
      `/v1/hackathons?noFeatured=3&perPage=${perPage}&page=${index.selected +
        1}`
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
        {hackaCarousel.map(hackathon => (
          <CarouselContainer
            key={hackathon.id}
            url={hackathon.cover ? hackathon.cover.url : DefaultCover}
          >
            <img
              id="cover"
              src={hackathon.cover ? hackathon.cover.url : DefaultCover}
              alt={`${hackathon.title} cover`}
            />

            <div className="content_container">
              <h2>{hackathon.title}</h2>
              <div className="organized">
                <span>
                  Organized by <strong>{hackathon.organizer.name}</strong>
                </span>
              </div>

              <div>
                <FaRegCalendarAlt color="#fff" size={21} />
                <span>
                  {format(parseISO(hackathon.event_date), "MMMM dd',' yyyy")}
                </span>
              </div>

              <div>
                <FaMapMarkerAlt color="#fff" size={21} />
                <span>{hackathon.online ? 'Online' : hackathon.location}</span>
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
            <Card
              key={hackathon.id}
              url={hackathon.cover ? hackathon.cover.url : DefaultCover}
            >
              <div className="content">
                <header>
                  <h2>{hackathon.title}</h2>
                </header>

                <div className="card_content">
                  <div className="organized">
                    <span>
                      Organized by <strong>{hackathon.organizer.name}</strong>
                    </span>
                  </div>

                  <div>
                    <FaRegCalendarAlt color="#1437E3" size={18} />
                    <span>
                      {format(
                        parseISO(hackathon.event_date),
                        "MMMM dd',' yyyy"
                      )}
                    </span>
                  </div>

                  <div>
                    <FaMapMarkerAlt color="#1437E3" size={18} />
                    <span>
                      {hackathon.online ? 'Online' : hackathon.location}
                    </span>
                  </div>

                  {hackathon.isParticipant ? (
                    <Link to={`hackathon/${hackathon.id}`}>Go to event</Link>
                  ) : (
                    <Link to={`/hackathon/${hackathon.id}/details`}>
                      Details
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </CardContainer>
      </PageContainer>

      {pagination.maxPage > 1 ? (
        <ReactPaginate
          pageCount={pagination.maxPage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          onPageChange={index => handlePageChange(index)}
          containerClassName="pagination-container"
          activeLinkClassName="active"
          nextLabel="&#10095;"
          previousLabel="&#10094;"
        />
      ) : (
        ''
      )}
    </Container>
  );
}
