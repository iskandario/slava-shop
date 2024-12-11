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
          <source media="(max-width: 768px)" srcSet={smallmainPhoto} />
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
  padding-top: 37.55%; 
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 120%; 
    margin-top: 8vw;
  }
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Картинка заполнит контейнер, сохраняя пропорции */

  @media (max-width: 768px) {
    object-fit: contain; /* На мобильных устройствах изображение будет целиком помещаться в контейнер */
    height: auto;
  }
`;

const StyledMain = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: -2vw;




   @media (max-width: 1400px) {
   margin-top: -3vw;
  }

  @media (max-width: 1000px) {
   margin-top: -5vw;
  }

  @media (max-width: 800px) {
   margin-top: -7vw;
  }

  @media (max-width: 600px) {
   margin-top: -8vw;
  }

   @media (max-width: 500px) {
   margin-top: -9vw;
  }

  
`;