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

export const StoreDescription = ({scrollToCatalog}: StoreDescriptionProps) => {
  const handleCatalogClick = () => {
    scrollToCatalog(); // Выполняем прокрутку сразу после открытия каталога
  };

  return (
    <StyledMainDiv>
      {/*//todo: Удалить после позиционирования outline в StyledMainGrid = div < div { outline }*/}
      <StyledMainGrid>
        <FirstBigDiv>
          <OneTextDiv>
            {/*&nbsp; = ширина одной буквы*/}
            {/*Настроить первую строку и по ней ровнять остальные, для этого лучше не использовать проблеы*/}
            {/*Так как используеться &nbsp;*/}

            {/*то что текст выходит за границы, ничего страшного */}
            <p><span>VYACHESLÁVNA&nbsp;&nbsp;&nbsp;начинает</span><br/>
              <span>свое&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;путешествие,</span><br/>
              <span>вкладывая&nbsp;&nbsp;&nbsp;&nbsp;в&nbsp;&nbsp;&nbsp;&nbsp;каждый</span><br/>
              <span>шов&nbsp;&nbsp;и&nbsp;&nbsp;каждый&nbsp;&nbsp;паттерн </span><br/>
              <span>бесценные&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;частицы</span> <br/>
              творчества</p>
          </OneTextDiv>
          <TwoTextDiv>
            <p>как распускающийся бутон редкого цветка, медленно и уверенно раскрывающий свое великолепие</p>
          </TwoTextDiv>
        </FirstBigDiv>

        <SecondBigDiv>
          <ThreeTextDiv>
            <PhotoDescription>
              <picture>
                <source media="(max-width: 768px)" srcSet={SmallPhoto}/>
                <img src={LargePhoto} alt="Main Catalog" style={{marginTop: '0px'}}/>
              </picture>
              <StyledButton onClick={handleCatalogClick}>
                К каталогу →
              </StyledButton>
            </PhotoDescription>
          </ThreeTextDiv>
          <FourTextDiv>
            <p>Каждое изделие — воплощение женственности, капля изысканности, которую можно почувствовать, дотронувшись
              до ткани</p>
          </FourTextDiv>
        </SecondBigDiv>
      </StyledMainGrid>
    </StyledMainDiv>
  );
};