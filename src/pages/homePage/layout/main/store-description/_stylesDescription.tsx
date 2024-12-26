import styled from "styled-components";
import { theme } from "../../../../../_globalStyles/theme";

export const StyledMainDiv = styled.div`

  margin-top: 57px;
  margin-left: calc(314% / (1920 / 100));
  margin-right: calc(190% / (1920 / 100));
  min-height: calc(1082px - 529px - 57px);

  @media (max-width: 768px) {
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: -20vw;
  }

   @media (max-width: 1100px) {
         margin-bottom: -10vw;

}

  @media (max-width: 900px) {
         margin-bottom: -20vw;

}


  @media (max-width: 768px) {
         margin-bottom: -35vw;

}

    @media (max-width: 700px) {
         margin-bottom: -38vw;

}


  @media (max-width: 600px) {
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: -50vw;

  }

   @media (max-width: 500px) {
         margin-bottom: -70vw;
}

   @media (max-width: 400px) {
         margin-bottom: -85vw;
}

   @media (max-width: 350px) {
         margin-bottom: -105vw;
}

 @media (max-width: 300px) {
         margin-bottom: -125vw;
}

 @media (max-width: 200px) {
         margin-bottom: -220vw;
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

  p > span {
    text-wrap: nowrap;
  }
  
  //todo: Удалить после позиционирования
  div > div {
    outline: 1px solid red;
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

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-height: 50vw;
 
    
    div {
      img {
        display: none; /* Убираем изображение на экранах меньше 768px */
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
  align-items: flex-start;
  width: 15vw;
  height: 20vw; 
  font-family: "Fira Mono", monospace;
  font-weight: normal;

  @media (max-width: 768px) {
    align-items: center;
    width: 20vw;

  }

   @media (min-width: 1500px) {
    img{
    margin-top: 0px;
    }
    width: calc(10px + 10vw); 
   }
     @media (min-width: 1300px) {
     width: calc(30px + 13vw);
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

  

  @media (max-width: 768px) {
    display: none; 
  }
`;

export const SecondBigDiv = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
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
  


  @media (max-width: 1100px) {
    margin-left: 10vw;

  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: calc(10px + 0.3vw); /* Шрифт уменьшится на меньших экранах, но не сильно */
  }
`;

export const TwoTextDiv = styled.div`
  align-self: flex-end;
  margin-left: 35px;
  margin-bottom: 50px;
  font-size: calc(9px + 0.5vw);

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: calc(10px + 0.3vw);
  }
    @media (max-width: 1100px) {
    display: none;
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

  @media (max-width: 768px) {
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

    @media (max-width: 768px) {
    & {
      width: 50% !important; /* Увеличиваем ширину на мобильных */
      text-align: center !important; /* Центрируем текст */
      margin-top: 20px !important; /* Уменьшаем отступ сверху */
    }

    p {
      font-size: 2.3vw !important; /* Увеличенный шрифт в абзаце */
    }
  }


`;


export const StyledButton = styled.button`
white-space: nowrap;

  background: none;
  border: none;
  font-family: "Fira Mono", monospace;
  font-size: calc(1.2vw + 5px);   
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  margin-top: 1vw; 
  margin-left:1vw;
  border-bottom: 0.9px solid ${theme.secondaryTextColor};
  transition: transform 0.2s ease;



  span {
    margin-left: 5px;
    font-size: 1.5vw; 
    margin-bottom: 2px;
  }



  @media (max-width: 768px) {
  font-size: 2.5vw;
  }

   @media (max-width: 560px) {
   font-size: 3.5vw;
   width: 25vw;
  }


 
`;