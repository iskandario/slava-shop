import styled from "styled-components";
import { theme } from "../../../../../_globalStyles/theme";

export const StyledMainDiv = styled.div`
  margin-top: 57px;
  margin-left: calc(314% / (1920 / 100));
  margin-right: calc(190% / (1920 / 100));
  min-height: calc(1082px - 529px - 57px);

  @media (max-width: 1000px) {
    margin-left: 5%;
    margin-right: 5%;
  }

  @media (max-width: 600px) {
    margin-left: 2%;
    margin-right: 2%;
  }
`;

export const StyledMainGrid = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  font-family: 'NEXT ART', sans-serif !important;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.15em;
  font-style: normal;
  height: calc(1082px - 529px - 57px);

  p {
    width: 208px;
  }

  div {
    a {
      color: ${theme.mainTextColor};
      border-bottom: ${theme.secondaryTextColor} 0.5px solid;
      cursor: pointer;
    }

    picture {
      display: block;
      width: 100%;
      max-width: 90%; /* Адаптивное изображение в процентах */
      margin: 0 auto;
    }

    img {
      margin-top: 34px;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  flex-grow: 1;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    div {
      img {
        display: none; /* Убираем изображение на экранах меньше 1000px */
      }

      a {
        font-size: 1.4rem; /* Увеличиваем кнопку к каталогу на мобильных */
      }
    }

    p {
      font-size: 1rem; /* Мини-текст на мобильных */
      text-align: center;
    }
  }

 
`;

export const PhotoDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  @media (max-width: 1000px) {
    align-items: center;
  }

   @media (min-width: 1500px) {
    width: calc(10px + 10vw); 
   }

`;

export const FirstBigDiv = styled.div`
  height: 100%;
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  margin-right: 60px;
  margin-left: -120px;

  

  @media (max-width: 1000px) {
    display: none; /* Убираем первый текстовый блок на экранах меньше 1000px */
  }
`;

export const SecondBigDiv = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;

    p {
      font-size: 0.9rem; /* Мини-текст на мобильных */
      text-align: center;
    }
  }
`;


export const OneTextDiv = styled.div`
  align-self: flex-start;
  font-size: calc(9px + 0.5vw); /* Шрифт будет увеличиваться с размером экрана */
  margin-right: 10px;
  @media (max-width: 1000px) {
    margin-bottom: 20px;
    font-size: calc(10px + 0.3vw); /* Шрифт уменьшится на меньших экранах, но не сильно */
  }
`;

export const TwoTextDiv = styled.div`
  align-self: flex-end;
  margin-left: 35px;
  margin-bottom: 50px;
  font-size: calc(9px + 0.5vw);

  @media (max-width: 1000px) {
    margin-left: 0;
    font-size: calc(10px + 0.3vw);
  }
    @media (min-width: 1500px) {
    margin-left: calc(10px + 10vw);
}
`;

export const ThreeTextDiv = styled.div`
  margin-right: 244px;
  margin-top: 130px;
  font-size: calc(9px + 0.5vw);

  @media (max-width: 1750px) {
    margin-right: 150px;
  }
  @media (max-width: 1530px) {
    margin-right: 100px;
  }
  @media (max-width: 1300px) {
    margin-right: 50px;
  }

  @media (max-width: 1000px) {
    margin-right: 0;
    margin-top: 50px;
    font-size: calc(10px + 0.3vw);
  }
`;

export const FourTextDiv = styled.div`
  width: 212px;
  line-height: 1.5;
  margin-top: 80px;
  font-size: calc(9px + 0.5vw);


  p {
    width: 100%;
  }


`;