import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 110px;
  }

  small {
    margin-top: 5px;
    margin-bottom: 30px;
  }

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

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  .or {
    margin: 20px;
  }

  button {
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: auto;
    color: #fff;
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border-radius: 6px;
    border: 0;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  margin: 10px 0 15px 0;
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
