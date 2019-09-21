import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Container } from './styles';

export default function Profile({ match }) {
  const { nickname } = match.params;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function loadProfile() {
      const { data } = await api.get(`/v1/users/${nickname}`);

      setProfile(data);
    }

    loadProfile();
  }, [nickname]);

  return (
    <Container>
      <h1>te</h1>
    </Container>
  );
}
