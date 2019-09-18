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
`;
export const H1 = styled.h1`
  margin: 15px 0 15px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  .or {
    margin: 20px;
  }

  h2 {
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

export const Input = styled.input`
  margin: 10px 0 10px 0;
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 0 0 0 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 2px solid #cccccc;
  border-radius: 6px;
  opacity: 1;

  &:focus {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 2px solid #1437e3;
    border-radius: 6px;
    opacity: 1;
  }
`;
