import styled from 'styled-components';

export const Container = styled.div`
  margin: 40px auto;

  .toast-background {
    background: lightcoral;
  }

  .actions--left {
    justify-content: flex-start !important;
  }

  .member__item:not(:last-of-type) {
    border-bottom: 5px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 25px;
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
`;
