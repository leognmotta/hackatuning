import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0px 1px 20px #0000000f;

  @media only screen and (max-width: 550px) {
    .tablet {
      padding-top: 0;
    }
  }
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 41px;
  }

  @media only screen and (max-width: 740px) {
    img {
      height: 34px;
    }
  }

  @media only screen and (max-width: 375px) {
    img {
      height: 28px;
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

  @media only screen and (max-width: 375px) {
    & {
      padding: 8px 10px;
      font-size: 16px;
    }
  }
`;

export const TabLink = styled(NavLink)`
  text-decoration: none;
  color: #cccccc !important;
  font-weight: bold;
  padding: 10px 15px;
  background: #eeeeee 0% 0% no-repeat padding-box;
  display: inline-block;
  text-align: center;
  width: 131px;

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

  @media only screen and (max-width: 550px) {
    & {
      width: 100%;
    }

    &.right {
      margin: 0;
      border-radius: 0;
    }

    &.left {
      border-radius: 0;
    }
  }
`;

export const TabeletNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  @media only screen and (max-width: 550px) {
    margin: 0;
  }
`;
