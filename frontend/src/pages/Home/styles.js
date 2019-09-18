import styled from 'styled-components';

export const Container = styled.div`
  .carousel .slide {
    background: none;
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;

    .selected {
      a {
        background: #bbd7fb 0% 0% no-repeat padding-box;
      }
    }

    .disabled {
      a {
        background: #ccc !important;
        cursor: not-allowed;
      }
    }

    li {
      list-style: none;
      margin: 10px;

      a {
        border: 2px solid #e0ecf9;
        border-radius: 6px;
        padding: 14px 18px;
        cursor: pointer;
      }
    }
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  @media only screen and (max-width: 400px) {
    padding: 10px;
  }

  #cover {
    width: 100%;
    max-width: 360px;
    max-height: 360px;
    margin-right: 10px;
    margin-right: 20px;
    border-radius: 6px;

    @media only screen and (max-width: 700px) {
      max-width: 280px;
      max-height: 280px;
      margin-right: 10px;
    }

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
  max-width: 960px;
  margin: 0 auto;

  h1 {
    margin-top: 40px;
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
  max-width: 889px;

  margin: 0 auto;

  @media only screen and (max-width: 995px) {
    max-width: 593px;
  }

  @media only screen and (max-width: 639px) {
    justify-content: center;
  }
`;

export const Card = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 20px #0000000d;
  border-radius: 6px;
  margin: 10px;

  header {
    height: 150px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 6px 0 0;

    h2 {
      color: #fff;
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
      margin: 10px 0;
      svg {
        margin-right: 10px;
      }
    }

    a {
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      padding: 10px 15px;
      display: block;
      margin-top: 10px;
      max-width: 245px;
      color: #fff;
      background: transparent
        linear-gradient(127deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
        no-repeat padding-box;
      border-radius: 6px;

      &:visited {
        color: #fff;
      }
    }
  }
`;
