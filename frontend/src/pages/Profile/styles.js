import styled from 'styled-components';

export const Container = styled.div`
  margin: 40px auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  .participants__roles {
    display: flex;
  }

  .participants__items {
    padding: 6px 10px;
    font-size: 14px;
    border-radius: 6px;
    margin-right: 10px;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 700;
    background-color: #210d4a;
  }

  .profile__box {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .profile__desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-family: 'Montserrat Alternates', sans-serif;
      color: #1437e3;
      font-size: 24px;
    }

    small {
      font-family: 'Montserrat Alternates', sans-serif;
      color: #210d4a;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .urls {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      svg {
        fill: #210d4a;
      }

      a {
        font-family: 'Montserrat Alternates', sans-serif;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        color: #210d4a;
        margin-left: 8px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .profile__content {
    padding: 30px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 0px 6px 6px 0px;
    margin-top: 20px;
    font-size: 15px;
    white-space: pre-wrap;
    color: #222222;
    letter-spacing: 1;
  }

  img {
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 6px 0px 0px 6px;
    width: 200px;
    max-height: 200px;
    object-fit: cover;
    border: 5px solid #eee;
    margin-bottom: 15px;
  }
`;
