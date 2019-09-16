import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 60px;

  li {
    list-style: none;

    width: 100%;
    height: 100%;

    .selected {
      background: #fff;

      span {
        color: #000;
      }

      svg {
        fill: #1437e3;
      }
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      font-size: 12px;
      font-weight: bold;
      background: #1437e3 0% 0% no-repeat padding-box;
      text-decoration: none;
      width: 100%;
      height: 100%;
      cursor: pointer;

      span {
        color: #fff;
      }

      svg {
        fill: #fff;
        margin-bottom: 5px;
      }

      &:visited {
        color: #fff;
      }
    }
  }
`;

export const StyledLink = styled(NavLink)``;
