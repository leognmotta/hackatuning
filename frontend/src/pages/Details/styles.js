import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px auto;

  .image_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding: 25px 40px 20px 40px;
    margin-bottom: 35px;
    background-size: cover;
    background-position: center;

    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(52, 140, 254, 0.8)),
        to(rgba(20, 55, 227, 0.8))
      ),
      url(${props => props.url});

    background-image: linear-gradient(
        rgba(52, 140, 254, 0.8),
        rgba(20, 55, 227, 0.8)
      ),
      url(${props => props.url});
  }

  @media only screen and (max-width: 750px) {
    .image_container {
      flex-direction: column;

      h1 {
        font-size: 28px !important;
      }

      h2 {
        font-size: 16px !important;
      }
    }
  }

  @media only screen and (max-width: 440px) {
    .image_container {
      padding: 15px 15px 5px 15px;
    }
  }

  button {
    background: #ff9914;
    /* background: #34adfe !important; */
    box-shadow: 0px 1px 20px #0000000d;
  }

  a {
    display: block;
    margin: 15px 0;
    background: #ff9914;

    @media only screen and (max-width: 440px) {
      margin-bottom: 25px;
    }
  }

  .header__button {
    @media only screen and (max-width: 750px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0;
      margin-bottom: -5px;
    }
  }

  .header__text {
    color: #fff;
    flex: 1;
    margin-right: 30px;

    @media only screen and (max-width: 750px) {
      margin-right: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    h1 {
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: 32px;
      margin-bottom: 10px;
    }

    .profile__link {
      color: #fff;
      text-decoration: none;
      background: transparent;

      &:hover {
        text-decoration: underline;
      }
    }

    .organizer {
      h2 {
        font-size: 20px;
        font-weight: 400;
        display: flex;
        align-items: center;

        @media only screen and (max-width: 375px) {
          flex-direction: column;
        }
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 15px;
        margin-right: 10px;

        @media only screen and (max-width: 375px) {
          margin: 10px 0;
        }
      }
    }
  }

  .details {
    display: flex;
    align-items: flex-start;
    padding: 0 70px;

    @media only screen and (max-width: 1150px) {
      padding: 0 !important;

      &__photo {
        padding-right: 17.5px !important;
      }

      &__desc {
        padding-left: 17.5px !important;
      }
    }

    @media only screen and (max-width: 800px) {
      flex-direction: column !important;

      &__awards {
        margin-bottom: 35px;
      }

      &__photo {
        padding-right: 0px !important;
      }

      &__desc {
        padding-left: 0px !important;
      }
    }

    &__photo {
      padding-right: 35px;
      flex: 50%;
      display: flex;
      flex-direction: column;

      #cover {
        width: 100% !important;
        max-height: 400px !important;
        object-fit: cover;
        box-shadow: 0px 1px 20px #0000000d;
        border-radius: 6px;
        display: block;
        margin-bottom: 35px;
      }
    }

    &__awards {
      padding: 30px;
      color: #fff;
      background: #34adfe 0% 0% no-repeat padding-box;
      border-radius: 6px;
      font-weight: 700;
      display: flex;
      align-items: center;

      p {
        white-space: pre-wrap;
        margin-left: 30px;
      }
    }

    &__desc {
      padding-left: 35px;
      flex: 50%;
    }

    &__text {
      h3 {
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: 25px;
        margin-bottom: 20px;
        border-bottom: 1px solid #34adfe;
        padding-bottom: 15px;
      }

      p {
        font-size: 16px;
        line-height: 1.7;
        color: #222222;
        letter-spacing: 0.5px;
        white-space: pre-wrap;
      }
    }

    &__dates {
      padding: 35px;
      background-color: #fff;
      box-shadow: 0px 1px 20px #0000000d;
      border-radius: 0px 0px 6px 6px;
      margin-bottom: 35px;

      div {
        display: flex;
        align-items: center;

        svg {
          fill: #1437e3;
          width: 22px;
          height: 22px;
          margin-right: 20px;
        }
        span {
          font-family: 'Montserrat Alternates', sans-serif;
          font-size: 16px;
          font-weight: 700;
        }
      }

      div:not(:last-of-type) {
        margin-bottom: 20px;
      }
    }
  }
`;
