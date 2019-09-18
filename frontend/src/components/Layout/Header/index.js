import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../services/api';

import Logo from '../../../assets/Logo@default.svg';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';
import {
  StyledHeader,
  Container,
  StyledLink,
  TabLink,
  TabeletNav,
} from './styles';

export default withRouter(function Header({ history }) {
  const isAuth = useSelector(state => state.auth.isAuth);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    async function getNotifications() {
      const { data } = await api.get('/v1/notifications');

      setNotifications(data);
    }

    getNotifications();
  }, [history.location.pathname]);

  let authMenu = (
    <Desktop
      notifications={notifications}
      showNotifications={showNotifications}
      toggleNotifications={setShowNotifications}
    />
  );

  if (width < 960) {
    authMenu = (
      <Tablet
        notifications={notifications}
        showNotifications={showNotifications}
        toggleNotifications={setShowNotifications}
      />
    );
  }

  if (width < 550) {
    authMenu = (
      <Mobile
        notifications={notifications}
        showNotifications={showNotifications}
        toggleNotifications={setShowNotifications}
      />
    );
  }

  return (
    <>
      <StyledHeader>
        <Container>
          <Link to="/">
            <img src={Logo} alt="Hackatuning Logo" />
          </Link>

          <nav>
            {isAuth ? (
              authMenu
            ) : (
              <ul>
                <StyledLink to="/login">Login</StyledLink>
              </ul>
            )}
          </nav>
        </Container>
      </StyledHeader>
      {width < 960 && isAuth ? (
        <TabeletNav className="tablet">
          <TabLink to="/hackathons" className="left" activeClassName="selected">
            Hackathons
          </TabLink>
          <TabLink to="/teams" className="right" activeClassName="selected">
            Teams
          </TabLink>
        </TabeletNav>
      ) : null}
    </>
  );
});
