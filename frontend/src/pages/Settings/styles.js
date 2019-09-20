import styled from 'styled-components';
// import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  /*###################################################################*/

  form {
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

    .roles {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
      label {
        width: 33%;
        display: flex;
        align-items: center;
        .checkbox {
          margin-right: 5px;
        }
      }
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
