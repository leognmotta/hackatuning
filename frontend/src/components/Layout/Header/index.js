import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/Logo@default.svg';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';
import { StyledHeader, Container, StyledLink, TabLink } from './styles';

import { store } from '../../../store';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log(store.getState());

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  let authMenu = <Desktop />;

  if (width < 960) {
    authMenu = <Tablet />;
  }

  if (width < 550) {
    authMenu = <Mobile />;
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
