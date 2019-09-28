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
`;
