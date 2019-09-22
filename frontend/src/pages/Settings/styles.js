import styled from 'styled-components';
// import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 10px;

  .file {
    margin-top: 10px;
    margin-bottom: 15px;
    background-color: #fff;
    padding: 8px;
    border-radius: 6px;
    border: 2px solid #cccccc;
  }

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
  .toast-background_success {
    background: #04a777;
  }
  .toast-progress-bar_success {
    background: #333745;
  }

  /*###################################################################*/

  form {
    max-width: 450px;

    .or {
      margin: 20px;
    }

    h4 {
      text-align: left;
      margin: 10px 0 10px 0;
    }

    small {
      text-align: left;
    }

    .btn {
      height: 40px;
      width: auto;
      color: #fff;
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

        input {
          flex: 1;
        }

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
  }
`;

export const H1 = styled.h1`
  margin: 15px 0 15px 0;
`;
