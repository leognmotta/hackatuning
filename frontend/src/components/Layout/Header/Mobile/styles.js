import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NotificationContianer = styled.div`
  position: relative;

  .badge {
    height: 12px;
    width: 12px;
    background: #e3143e;
    border-radius: 6px;
    position: absolute;

    top: 0;
    right: -3px;
  }

  .notification {
    position: absolute;
    padding: 10px;
    border-radius: 6px;
    top: 30px;
    left: -270px;
    background: #ffffff;
    box-shadow: 0px 1px 20px #0000000f;
    width: 300px;

    div {
      border-bottom: 1px solid #f3f3f3f3;
      padding: 4px 0;
      width: 100%;
    }
  }
`;

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
    background: #1437e3;
    position: relative;
  }

  .selected {
    background: #ffffff;
    span {
      color: #1437e3;
    }

    svg {
      fill: #1437e3 !important;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 10px;
    font-weight: bold;
    color: #fff;

    svg {
      fill: #fff;
      margin-bottom: 5px;
      cursor: pointer;
    }

    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;

    &:visited {
      color: #fff;
    }
  }
`;

export const StyledLink = styled(NavLink)``;
