import styled from 'styled-components';

export const Container = styled.div`
  .carousel .slide {
    background: none;
  }

  .carousel .control-arrow {
    height: 80%;
    margin-top: 48px !important;
  }

  .carousel .carousel-status {
    margin-top: 20px;
  }

  .pagination-container {
    margin-top: 15px;
  }

  @media only screen and (max-width: 400px) {
    .carousel .carousel-status {
      margin-top: 0px;
    }

    .carousel .control-arrow {
      display: none;
    }
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;

  @media only screen and (max-width: 400px) {
    margin-top: 0px;
  }

  #cover {
    width: auto;
    max-height: 200px;
    max-width: 320px;
    margin-right: 30px;
    border-radius: 6px;

    @media only screen and (max-width: 630px) {
      display: none;
    }
  }

  .content_container {
    h2,
    h3,
    span {
      color: #fff;
      text-align: left;
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 18px;
    }

    .organized {
      font-size: 20px;
      margin-bottom: 10px;

      span {
        font-weight: 400;
      }
    }

    h2 {
      font-family: 'Montserrat Alternates', sans-serif;
      font-weight: 700;
      font-size: 32px;
    }

    @media only screen and (max-width: 800px) {
      h2 {
        font-size: 28px;
      }

      span {
        font-size: 16px;
      }
    }

    a {
      text-decoration: none;
      font-weight: bold;
      padding: 10px 15px;
      background: #34adfe 0% 0% no-repeat padding-box;
      display: block;
      margin-top: 10px;
      max-width: 245px;
      color: #fff;
      border-radius: 6px;

      &:visited {
        color: #fff;
      }
    }

    div {
      display: flex;

      svg {
        margin-right: 10px;
        font-weight: bold;
      }
    }
  }

  height: 350px;
  border-radius: 6px;

  background: #163de5;

  background-image: -ms-linear-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(52, 140, 254, 0.6)),
      to(rgba(20, 55, 227, 0.7))
    ),
    url(${props => props.url});

  background-image: -o-linear-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(52, 140, 254, 0.6)),
      to(rgba(20, 55, 227, 0.7))
    ),
    url(${props => props.url});

  background-image: -moz-linear-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(52, 140, 254, 0.6)),
      to(rgba(20, 55, 227, 0.7))
    ),
    url(${props => props.url});

  background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(52, 140, 254, 0.6)),
      to(rgba(20, 55, 227, 0.7))
    ),
    url(${props => props.url});

  background-image: linear-gradient(
      rgba(52, 140, 254, 0.6),
      rgba(20, 55, 227, 0.7)
    ),
    url(${props => props.url});

  background-size: cover;
  background-position: center;
`;

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;

  h1 {
    margin-top: 35px;
    margin-bottom: 22px;
    padding-bottom: 17px;
    border-bottom: 1px solid #bbd7fb;
    text-align: left;
    font-weight: bold;
    font-size: 24px;
    color: #210d4a;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div`
  width: 25%;
  padding: 15px;

  @media only screen and (max-width: 995px) {
    width: 50%;
  }

  @media only screen and (max-width: 639px) {
    width: 100%;
  }

  .content {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 20px #0000000d;
    border-radius: 6px;
  }

  header {
    height: 150px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 6px 0 0;

    h2 {
      color: #fff;
      font-family: 'Montserrat Alternates', sans-serif;
      padding: 22px;
      font-size: 20px;
      text-align: left;
    }

    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(52, 140, 254, 0.6)),
        to(rgba(20, 55, 227, 0.7))
      ),
      url(${props => props.url});
    background-image: linear-gradient(
        rgba(52, 140, 254, 0.6),
        rgba(20, 55, 227, 0.7)
      ),
      url(${props => props.url});
    background-size: cover;
    background-position: center;
  }

  .card_content {
    padding: 20px;

    div {
      display: flex;
      margin: 10px 0;
      align-items: center;

      svg {
        margin-right: 15px;
      }

      span {
        font-weight: 700;
        font-size: 15px;
        color: #210d4a;
      }
    }

    a {
      margin-top: 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      padding: 10px 15px;
      display: block;
      width: 100%;
      color: #fff;
      background: transparent
        linear-gradient(127deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
        no-repeat padding-box;
      border-radius: 6px;

      &:visited {
        color: #fff;
      }
    }

    .organized {
      margin-bottom: 15px;

      span {
        font-size: 12px !important;
        font-weight: 400;
      }
    }
  }
`;
