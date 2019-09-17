import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  margin-top: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  button {
    height: 50px;
    width: auto;
    border-radius: 15px;
    margin-bottom: 5px;
    color: #fff;
    background: transparent
      linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
      no-repeat padding-box;
    border: 0;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  margin: 10px 0 10px 0;
  height: 35px;
  width: 350px;
  border-radius: 12px;
  padding: 0 0 0 10px;
  border: 1px solid #eee;
`;
