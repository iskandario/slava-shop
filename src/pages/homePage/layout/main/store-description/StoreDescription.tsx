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
            <p><span>VYACHESLÁVNA&nbsp;&nbsp;&nbsp;начинает</span><br/>
              <span>свое&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;путешествие,</span><br/>
              <span>вкладывая&nbsp;&nbsp;&nbsp;&nbsp;в&nbsp;&nbsp;&nbsp;&nbsp;каждый</span><br/>
              <span>шов&nbsp;&nbsp;и&nbsp;&nbsp;каждый&nbsp;&nbsp;паттерн </span><br/>
              <span>бесценные&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;частицы</span> <br/>
              творчества</p>
          </OneTextDiv>
          <TwoTextDiv>
            <p><span>как&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;распускающийся</span><br/>
              <span>бутон&nbsp;&nbsp;&nbsp;редкого&nbsp;&nbsp;&nbsp;цветка,</span><br/>
              <span>медленно&nbsp;&nbsp;&nbsp;&nbsp;и&nbsp;&nbsp;&nbsp;&nbsp;уверенно</span><br/>
              <span>раскрывающий&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;свое</span><br/>
              великолепие</p>
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
            <p>
             <span>Каждое&nbsp;&nbsp;&nbsp;изделие&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—</span><br/>
              воплощение<br/>
              <span>женственности,&nbsp;&nbsp;&nbsp;&nbsp;капля</span><br/>
              <span>изысканности,&nbsp;которую</span><br/>
               <span>можно&nbsp;&nbsp;&nbsp;почувствовать,</span><br/>
              <span>дотронувшись&nbsp;до&nbsp;ткани</span>
            </p>
          </FourTextDiv>
        </SecondBigDiv>
      </StyledMainGrid>
    </StyledMainDiv>
  );
};