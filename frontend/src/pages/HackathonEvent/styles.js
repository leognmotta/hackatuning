import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    font-family: 'Montserrat Alternates', sans-serif;
    text-align: center;
  }

  h2 {
    font-weight: 400;
    font-size: 18px;
  }

  margin: 40px 0;

  .toast-background {
    background: lightcoral;
  }
  .toast-font-size {
    color: #fff;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
  }
  .toast-progress-bar {
    background: red;
  }
  .toast-background-success {
    background: #04a777;
  }
  .toast-progress-bar-success {
    background: #333745;
  }

  .pagination-container {
    margin-bottom: -20px !important;
  }

  .search {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }

    &__search {
      flex: 35%;
    }

    &__text {
      padding-left: 30px;
      flex: 65%;

      @media only screen and (max-width: 600px) {
        padding-left: 0px;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -15px;
    margin-bottom: 5px;

    @media only screen and (max-width: 460px) {
      margin-top: -20px;
    }

    a,
    button {
      background: #34adfe !important;
      display: flex;
      align-items: center;

      @media only screen and (max-width: 460px) {
        font-size: 12px !important;
        padding: 8px !important;
        height: 40px;
      }
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 50%;
  padding: 20px;
  justify-content: center !important;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }

  @media only screen and (max-width: 550px) {
    padding: 0;
    margin-top: 20px;

    .tab-content {
      flex-direction: column;
      justify-content: center !important;
      align-items: center !important;

      img {
        margin-right: 0;
      }
    }

    .participant_content {
      text-align: center;

      .align-right {
        justify-content: center !important;
      }

      .participants__roles {
        justify-content: center !important;
      }
    }
  }

  .tab-content {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 0px 6px 6px 0px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
  }

  .participant_content {
    display: flex;
    flex-direction: column;
    width: 100%;

    h2 {
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: 24px;
    }

    small {
      font-size: 15px;
      color: #ff9914;
      font-weight: 700;
    }

    .align-right {
      display: flex;
      justify-content: flex-end;
    }

    .participants__roles {
      display: flex;
    }

    .participants__items {
      padding: 6px;
      font-size: 12px;
      border-radius: 6px;
      margin-right: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
      color: #fff;
      background-color: #210d4a;
    }

    .profile__urls {
      display: flex;
      align-items: center;
    }

    .participants__actions {
      display: flex;
      align-items: center;
      justify-content: center;

      .link:not(:last-child) {
        margin-right: 15px;
      }

      button:disabled {
        background: #ddd !important;
        cursor: not-allowed;
      }
    }
  }

  img {
    max-width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid #eee;
    object-fit: cover;
    margin-right: 20px;
  }
`;

export const Content = styled.div`
  padding: 35px;
  background: #e0ecf9 0% 0% no-repeat padding-box;
  border-radius: 6px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 50px;
`;
