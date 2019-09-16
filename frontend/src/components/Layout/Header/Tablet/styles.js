import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;

  li {
    margin: 0 10px;
    list-style: none;
    cursor: pointer;
  }

  .btn {
    color: #fff;
    padding: 8px 13px;
    font-weight: bold;
  }

  .create_hackathon {
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border: 0;
    border-radius: 6px;
    margin-right: 10px;
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  background: transparent
    linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 6px;

  &:visited {
    color: #fff;
  }
`;
