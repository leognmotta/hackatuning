import styled from 'styled-components';

export const CardTeam = styled.div`
  display: flex;
  justify-content: flex-start;

  @media only screen and (max-width: 470px) {
    flex-direction: column;

    .team-id {
      justify-content: center;
      border-radius: 6px 6px 0px 0px !important;
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 30px;
  }

  .team-id {
    display: flex;
    align-items: center;
    color: #fff;
    font-family: 'Montserrat Alternates', sans-serif;
    padding: 30px;
    font-weight: 700;
    font-size: 40px;
    background-color: red;
    background: transparent
      linear-gradient(
        133deg,
        #348cfe 0%,
        #163de5 93%,
        #1437e3 100%,
        #1437e3 100%
      )
      0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 6px 0px 0px 6px;
  }

  .team-content {
    flex: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 0px 6px 6px 0px;
    padding: 15px 30px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .title {
    font-size: 18px;
    font-family: 'Montserrat Alternates', sans-serif;

    strong {
      text-transform: uppercase;
    }
  }

  .creator {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .members {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    svg {
      fill: #1437e3;
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }

  .member {
    display: flex;
    flex-direction: column;
  }

  .member__link {
    display: flex;
    text-decoration: none;
    align-items: center;
    font-weight: 700;
    color: #210d4a;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }

    &:not(:last-of-type) {
      margin-bottom: 20px;
    }

    .link {
      fill: #ff9914;
      margin-right: 10px;
    }

    .external {
      fill: #210d4a;
      margin-left: 8px;
    }
  }

  .actions {
    margin-top: 10px;
  }
`;
