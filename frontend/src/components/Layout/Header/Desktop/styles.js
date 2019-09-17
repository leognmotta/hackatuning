import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;

  li {
    margin: 0 10px;
    list-style: none;

    svg {
      cursor: pointer;
    }
  }

  .notification_container {
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
      left: -280px;
      background: #ffffff;
      box-shadow: 0px 1px 20px #0000000f;
      width: 300px;

      div {
        border-bottom: 1px solid #f3f3f3f3;
        padding: 4px 0;
        width: 100%;
      }
    }
  }

  .create_hackathon {
    text-decoration: none;
    color: #fff;
    padding: 10px 20px;
    font-weight: bold;
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border: 0;
    border-radius: 6px;
    margin-right: 10px;

    &:visited {
      color: #fff;
    }
  }
`;

export const TabLink = styled(NavLink)`
  text-decoration: none;
  color: #cccccc !important;
  font-weight: bold;
  padding: 10px 15px;
  background: #eeeeee 0% 0% no-repeat padding-box;

  &.left {
    border-radius: 6px 0px 0px 6px;
  }

  &.right {
    border-radius: 0px 6px 6px 0px;
    margin-right: 10px;
  }

  &.selected {
    color: #1437e3 !important;
    background: #bbd7fb 0% 0% no-repeat padding-box;
  }

  &:visited {
    color: #fff;
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
