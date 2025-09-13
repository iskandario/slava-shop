import * as React from 'react';
import styled from "styled-components";
import { StoreDescription } from "./store-description/StoreDescription";
import mainPhoto from '../../../../assets/images/mainPagePhoto.png';
import smallmainPhoto from '../../../../assets/images/smallMainPage.png';

type MainProps = {
  scrollToCatalog: () => void; 
};

export const Main = ({ scrollToCatalog }: MainProps) => {
  return (
    <StyledMain>
      <PhotoWrapper>
        <picture>
          <source media="(max-width: 768px)" srcSet={smallmainPhoto} />
          <StyledImg src={mainPhoto} alt="Главное фотка" />
        </picture>
      </PhotoWrapper>
      <StoreDescription scrollToCatalog={scrollToCatalog} />
    </StyledMain>
  );
};

const PhotoWrapper = styled.div`
  position: relative;
  margin-top: 5vw;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 17%;
    margin-top: 0;
    height: auto;
  }
`;

const StyledImg = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  margin-left: 10%;

  @media (max-width: 1000px) {
    margin-top: 4vw;
  }

  @media (max-width: 768px) {
    position: static;
    margin-left: 0%;
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    margin-top: 0;
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