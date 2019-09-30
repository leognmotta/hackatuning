import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    background: #F6F8F9;
  }

  body, input, button {
    font-family: 'Montserrat', sans-serif;
  }

  #root {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  main {
    width: 100%;
    max-width: 1390px;
    margin: 0 auto auto auto;
    padding: 1em;
    flex: 1;
    background: #F6F8F9;

    .toast-font-size {
    color: #fff;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
  }

  .toast-background {
    background: #DD2D4A;
  }

  .toast-progress-bar {
    background: rgba(0, 0, 0, 0.3);
  }

  .toast-background-success {
    background: #04a777;
  }

  .toast-progress-bar-success {
    background: #333745;
  }
  }

  button {
    cursor: pointer;
  }

  .pagination-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    margin-bottom: 35px;

    .selected {
      a {
        border: 2px solid #bbd7fb;
        background: #bbd7fb 0% 0% no-repeat padding-box;
        color: #1437E3;
      }
    }

    .disabled {
      a {
        cursor: not-allowed;
      }
    }

    .next a, .previous a{
      border: 2px solid #EEEEEE;
      background: #EEEEEE;
      color: #CCC;
    }

    li {
      list-style: none;
      margin: 10px;
      padding-bottom: 15px;

      a {
        border: 2px solid #e0ecf9;
        border-radius: 6px;
        padding: 10px 15px;
        color: #BBD7FB;
        cursor: pointer;
      }
    }
  }

  .link {
    text-decoration: none;
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 700;
    color: #1437E3;
    font-size: 14px;

    &--black {
      color: #231456;
      font-size: 18px;
      text-decoration: underline;
      text-transform: uppercase;
    }
  }

  .link:hover {
    text-decoration: underline;
  }

  .label {
    font-family: 'Montserrat Alternates', sans-serif;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    display: block;
  }


  .roles {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    justify-content: flex-start;

    label {
      display: flex;
      align-items: center;
      margin-right: 10px;
      font-size: 15px;

      .checkbox {
        margin-right: 5px;
      }
    }
  }
`;
