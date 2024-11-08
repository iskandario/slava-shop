import * as React from 'react';
import styled from "styled-components";
import { StoreDescription } from "./store-description/StoreDescription";
import mainPhoto from '../../../../assets/images/mainPagePhoto.jpg';
import smallmainPhoto from '../../../../assets/images/smallMainPage.jpg';

type MainProps = {
  scrollToCatalog: () => void; 
};

export const Main = ({ scrollToCatalog }: MainProps) => {
  return (
    <StyledMain>
      <PhotoWrapper>
        <picture>
          <source media="(max-width: 1000px)" srcSet={smallmainPhoto} />
          <StyledImg src={mainPhoto} alt="Главное фото" />
        </picture>
      </PhotoWrapper>
      <StoreDescription scrollToCatalog={scrollToCatalog} />
    </StyledMain>
  );
};

const PhotoWrapper = styled.div`
  position: relative;
  margin-top: 60px;
  width: 100%;
  padding-top: 27.55%; /* Соотношение сторон 529 / 1920 * 100 = 27.55% */
  overflow: hidden;

  @media (max-width: 1000px) {
    padding-top: 120%; /* Задаем более высокое соотношение для вертикальной ориентации */
  }
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Картинка заполнит контейнер, сохраняя пропорции */

  @media (max-width: 1000px) {
    object-fit: contain; /* На мобильных устройствах изображение будет целиком помещаться в контейнер */
    height: auto;
  }
`;

const StyledMain = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;