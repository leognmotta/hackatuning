import styled from 'styled-components';

export const Container = styled.div`
  margin: 40px auto;

  .actions--left {
    justify-content: flex-start !important;
  }

  .member__item:not(:last-of-type) {
    border-bottom: 5px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 25px;
  }

  form {
    max-width: 430px;
    margin: 0 auto;

    h2 {
      text-align: center;
      margin: 20px 0;
    }
  }
`;
