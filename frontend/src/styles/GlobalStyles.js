import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
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
    max-width: 1020px;
    margin: 0 auto auto auto;
    padding: 1em;
    flex: 1;
  }

  button {
    cursor: pointer;
  }
`;
