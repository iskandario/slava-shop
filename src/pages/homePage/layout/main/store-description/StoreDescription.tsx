import React from 'react';
import LargePhoto from "../../../../../assets/images/catalogmain_photo.jpg";
import SmallPhoto from "../../../../../assets/images/smallMainPage.jpg";
import {
  FirstBigDiv, FourTextDiv,
  OneTextDiv,
  PhotoDescription,
  SecondBigDiv,
  StyledMainDiv,
  StyledMainGrid, ThreeTextDiv, TwoTextDiv, StyledButton
} from "./_stylesDescription";

type StoreDescriptionProps = {
  scrollToCatalog: () => void;
};

export const StoreDescription = ({ scrollToCatalog }: StoreDescriptionProps) => {
  const handleCatalogClick = () => {
    scrollToCatalog(); // Выполняем прокрутку сразу после открытия каталога
  };

  return (
    <StyledMainDiv>
      <StyledMainGrid>
        <FirstBigDiv>
          <OneTextDiv>
            <p>VYACHESLÁVNA начинает свое путешествие, вкладывая в каждый шов и каждый паттерн бесценные частицы творчества</p>
          </OneTextDiv>
          <TwoTextDiv>
            <p>как распускающийся бутон редкого цветка, медленно и уверенно раскрывающий свое великолепие</p>
          </TwoTextDiv>
        </FirstBigDiv>

        <SecondBigDiv>
          <ThreeTextDiv>
            <PhotoDescription>
              <picture>
                <source media="(max-width: 768px)" srcSet={SmallPhoto} />
                <img src={LargePhoto} alt="Main Catalog" style={{ marginTop: '0px' }} />
              </picture>
              <StyledButton onClick={handleCatalogClick}>
                К каталогу →
              </StyledButton>
            </PhotoDescription>
          </ThreeTextDiv>
          <FourTextDiv>
            <p>Каждое изделие — воплощение женственности, капля изысканности, которую можно почувствовать, дотронувшись до ткани</p>
          </FourTextDiv>
        </SecondBigDiv>
      </StyledMainGrid>
    </StyledMainDiv>
  );
};