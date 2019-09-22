import styled from 'styled-components';

export const TeamContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .box {
    width: 50%;
    padding: 15px;

    @media only screen and (max-width: 995px) {
      width: 100%;
    }
  }
`;
