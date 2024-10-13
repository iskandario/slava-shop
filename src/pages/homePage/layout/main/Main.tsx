// @flow
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
          <img src={mainPhoto} alt="Главное фото" />
        </picture>
      </PhotoWrapper>
      <StoreDescription scrollToCatalog={scrollToCatalog} />
    </StyledMain>
  );
};

const PhotoWrapper = styled.div`
  position: relative;
  margin-top: 60px; /* Отступ сверху, чтобы не перекрывать хедер */

  &::before {
    font-family: "NEXT ART", monospace;
    position: absolute;
    line-height: 96%;
    top: 29px;
    right: 14%;
    color: #ffffff;
    content: 'Ss’24 white swan';
    font-weight: bold;
    max-width: 136px;
    max-height: 89px;
    font-size: 2rem;
    z-index: 2;
  }

  max-height: 530px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1000px) {
    margin-top: 80px; /* Увеличиваем отступ для мобильной версии */
  }
`;

const StyledMain = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 1082px;
`;