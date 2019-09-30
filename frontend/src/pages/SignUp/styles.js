import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 430px;

  img {
    height: 110px;
  }

  .subTitle {
    margin-top: 5px;
    margin-bottom: 30px;
  }

  .btn {
    height: 40px;
    width: auto;
    color: #fff;
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border-radius: 6px;
    border: 0;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .urls {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    .btn_add {
      margin-top: auto;
      width: 40px;
      height: 35px;
      margin-bottom: 12px;
      background: transparent
        linear-gradient(
          158deg,
          #348cfe 0%,
          #163de5 93%,
          #1437e3 100%,
          #1437e3 100%
        )
        0% 0% no-repeat padding-box;
      border-radius: 6px;
    }

    .inner_input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .btn_remove {
        width: 47px;
        height: 35px;
        margin: auto 0 auto 10px;
        margin-bottom: 12px;
        background: #e3143e;
        border-radius: 6px;
      }
    }

    .url_box {
      width: 85%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const H1 = styled.h1`
  margin: 15px 0 5px 0;
`;
