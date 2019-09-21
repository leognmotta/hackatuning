import React, { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import api from '../../services/api';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Container } from './styles';

export default function Profile({ match }) {
  const { nickname } = match.params;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function loadProfile() {
      const { data } = await api.get(`/v1/users/${nickname}`);

      console.log(data);

      setProfile(data);
    }

    loadProfile();
  }, [nickname]);

  return (
    <Container>
      <img
        src={profile.avatar ? profile.avatar.url : DefaultAvatar}
        alt={profile.name}
      />
      <h1>{profile.name}</h1>
      <small>{profile.nickname}</small>

      {/* {profile.urls.map(url => (
        <span>
          <FaGlobe /> {url.url}
        </span>
      ))} */}
    </Container>
  );
}
