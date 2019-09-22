import styled from 'styled-components';

export const Container = styled.div`
  margin: 40px auto;

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

  .box {
    width: 50%;
    padding: 15px;

    @media only screen and (max-width: 995px) {
      width: 100%;
    }
  }
`;

export const ManageTeamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div``;
