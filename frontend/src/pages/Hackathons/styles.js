import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    text-align: center;
  }

  margin: 30px auto;

  .heading_section {
    margin-top: 35px;
    margin-bottom: 22px;
    padding-bottom: 17px;
    border-bottom: 1px solid #bbd7fb;
    text-align: left;
    font-weight: bold;
    font-size: 24px;
    color: #210d4a;
  }
`;

export const ParticipantContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

export const ManageHackathonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div`
  width: 25%;
  padding: 15px;

  @media only screen and (max-width: 995px) {
    width: 50%;
  }

  @media only screen and (max-width: 639px) {
    width: 100%;
  }

  .subtitle {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .content {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 6px;
  }

  header {
    height: 150px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 6px 0 0;

    h2 {
      color: #fff;
      font-family: 'Montserrat Alternates', sans-serif;
      padding: 22px;
      font-size: 20px;
      text-align: left;
    }

    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(52, 140, 254, 0.6)),
        to(rgba(20, 55, 227, 0.7))
      ),
      url(${props => props.url});
    background-image: linear-gradient(
        rgba(52, 140, 254, 0.6),
        rgba(20, 55, 227, 0.7)
      ),
      url(${props => props.url});
    background-size: cover;
    background-position: center;
  }

  .card_content {
    padding: 20px;

    div {
      display: flex;
      margin: 10px 0;
      align-items: center;

      svg {
        margin-right: 15px;
      }

      span {
        font-weight: 700;
        font-size: 15px;
        color: #210d4a;
      }
    }

    a {
      margin-top: 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      padding: 10px 15px;
      display: block;
      width: 100%;
      color: #fff;
      background: transparent
        linear-gradient(127deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
        no-repeat padding-box;
      border-radius: 6px;

      &:visited {
        color: #fff;
      }
    }

    .organized {
      margin-bottom: 15px;

      span {
        font-size: 12px !important;
        font-weight: 400;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        font-size: 14px;
        padding: 2px 10px !important;
        margin-left: 10px;
      }

      a {
        margin-top: -2px;
        max-width: 55px;
        font-size: 14px;
        padding: 10px;
      }
    }
  }
`;
