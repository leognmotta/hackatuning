import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;

  .toast-background {
    background: lightcoral;
  }
  .toast-font-size {
    color: #fff;
    font-weight: bold;
  }
  .toast-progress-bar {
    background: red;
  }
  .toast-background_success {
    background: lightgreen;
  }
  .toast-progress-bar_success {
    background: green;
  }
`;
