import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/Logo@default.svg';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';
import { StyledHeader, Container, StyledLink, TabLink } from './styles';

export default function Header() {
  const [isAuth, setIsAuth] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      read: false,
      type: 'notification',
      _id: '5d8001b7cd98323217242e75',
      content: 'You have created Rocketseat',
      user: 1,
      url: 'http://localhost:3000/hackathons/6',
      createdAt: '2019-09-16T21:42:15.231Z',
      updatedAt: '2019-09-16T21:42:15.231Z',
      __v: 0,
    },
    {
      read: false,
      type: 'notification',
      _id: '5d7fff3147fb002e3bcafed2',
      content: 'You have created dadasdasd asd sadasd asdasasdasddas ada',
      user: 1,
      createdAt: '2019-09-16T21:31:29.993Z',
      updatedAt: '2019-09-16T21:31:29.993Z',
      __v: 0,
    },
    {
      read: false,
      type: 'notification',
      _id: '5d7fff2747fb002e3bcafed0',
      content: 'You have created First',
      user: 1,
      createdAt: '2019-09-16T21:31:19.758Z',
      updatedAt: '2019-09-16T21:31:19.758Z',
      __v: 0,
    },
    {
      read: false,
      type: 'notification',
      _id: '5d7ffd8f7150a42c7afaac80',
      content: 'You have created First',
      user: 1,
      createdAt: '2019-09-16T21:24:31.508Z',
      updatedAt: '2019-09-16T21:24:31.508Z',
      __v: 0,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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

      {width < 960 && isAuth ? (
        <div className="tablet">
          <TabLink to="/hackathons" className="left" activeClassName="selected">
            Hackathons
          </TabLink>
          <TabLink to="/teams" className="right" activeClassName="selected">
            Teams
          </TabLink>
        </div>
      ) : null}
    </StyledHeader>
  );
}
