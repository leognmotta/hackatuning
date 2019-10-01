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

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 12px solid #34adfe;
    position: absolute;
    right: 10px;
    top: -12px;
  }

  .ui__sub {
    position: absolute;
    z-index: 999;
    right: -6px;
    width: 130px;
    top: 45px;
    display: none;

    & .ui__subitem {
      display: flex;

      .ui__sublink {
        font-weight: bold;
        background: #34adfe;
        width: 100%;
        padding: 8px;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        text-align: center;
        color: #fff;
        font-size: 12px;
        border-bottom: 3px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
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
      z-index: 100000;

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
    font-size: 14px;
    padding: 8px 15px;
    font-weight: bold;
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border: 0;
    border-radius: 6px;
    margin-right: 1px;

    &:visited {
      color: #fff;
    }
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
