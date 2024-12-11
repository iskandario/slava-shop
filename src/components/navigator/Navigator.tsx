import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import { theme } from "../../_globalStyles/theme";
import logoA from '../../assets/images/logoA.svg';
import { useBasket } from "../../pages/basket/BasketContext";

export const Navigation = () => {
  const { basket } = useBasket(); 
  const [animateBasket, setAnimateBasket] = useState(false);
  const location = useLocation();
  const totalItems = basket.reduce((sum, product) => sum + product.quantity, 0);


  useEffect(() => {
    if (basket.length > 0) {
      setAnimateBasket(true);
      const timer = setTimeout(() => setAnimateBasket(false), 500); 
      return () => clearTimeout(timer);
    }
  }, [basket]);

  const isBasketPage = location.pathname === '/basket';

  return (
    <GeneralDiv>
      <DivForButton>

        <LogoLink to="/">
          <Logo src={logoA} alt="logo" />
        </LogoLink>

        <StyleDivForButton>
        {!isBasketPage && (
          <StyledButton
            sx={{ textTransform: 'none' }}
            variant="text"
            size="small"
          >
            <StyledNavLink to="/basket">Корзина/</StyledNavLink>
            {basket.length !== 0 ? <BasketCount  $animate={animateBasket}>{basket.length}</BasketCount> : ''}
          </StyledButton>
          )}
        </StyleDivForButton>
      </DivForButton>
    </GeneralDiv>
  );
};

const GeneralDiv = styled.div`
  height: 65px;
  width: 100%;
  background-color: ${theme.mainBackgroundColor};
  display: flex;
  align-items: center;
`;

const DivForButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 0 20px; 
`;

const StyleDivForButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; 
  padding: 0 5px;
`;

const StyledButton = styled(Button)`
  && {
    font-family: "Fira Mono", monospace;
    text-decoration: none;
    background-color: ${theme.mainBackgroundColor};
    color: ${theme.mainTextColor};
    border-radius: 8px;
    margin-top: 1vw;
    z-index: 1000;
    margin-bottom: -2px;



  

    &:hover {
      background-color: transparent;
      color: ${theme.secondaryTextColor};
      box-shadow: none;
    }
  

  
`;
const BasketCount = styled.span<{ $animate: boolean }>`
  color: black;
  border-radius: 100%;
  padding: 2px 8px;
  font-size: calc(0.5vw + 10px);
  transition: transform 0.2s ease, color 0.2s ease;

  ${({ $animate }) =>
      $animate &&
      `
        transform: scale(1.4); 
        opacity: 0.9;
      `}

   @media (max-width: 768px) {
}

  
`;

const LogoLink = styled(NavLink)`
  margin-right: 16px;
  margin-left: 70px;
  z-index: 1000;
  &:hover {
    cursor: pointer; /* Указываем, что ссылка кликабельна */
  }


   @media (max-width: 1200px) {
    margin-left: 6vw;
    margin-top: 3vw;
}

 @media (max-width: 1100px) {
    margin-left: 6vw;
    margin-top: 6vw;
}

   @media (max-width: 968px) {
    margin-left: 5vw;
    margin-top: 5vw;
  }

  @media (max-width: 868px) {

  }

  @media (max-width: 768px) {
    width: 6vw;
    margin-left: -8vw;
  }

  @media (max-width: 508px) {
    width: 9vw;
    margin-left: -10vw;
  }

 
`;

const Logo = styled.img`
  margin-top: 3vw;
  width: 4vw;
  margin-left: -4vw;


   @media (max-width: 3200px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -2vw;
  }


   @media (max-width: 2900px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -2vw;
  }


   @media (max-width: 2800px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -2vw;
  }



 @media (max-width: 2400px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }


 @media (max-width: 2200px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }



  @media (max-width: 2000px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }




    @media (max-width: 1900px) {
    width: 3.5vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }

   @media (max-width: 1800px) {
    width: 4vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }

 @media (max-width: 1700px) {
    width: 3.5vw;
    margin-top: 2.5vw;
    margin-left: -3.5vw;
  }


  @media (max-width: 1600px) {
    width: 4vw;
    margin-top: 3vw;
    margin-left: -3vw;
  }




   @media (max-width: 1400px) {
    width: 4vw;
    margin-top: 3vw;
    margin-left: -4vw;
  }


   @media (max-width: 1300px) {
    width: 4.5vw;
    margin-top: 3vw;
    margin-left: -5vw;
  }

  @media (max-width: 1200px) {
    width: 5vw;
    margin-top: 0vw;
    margin-left: -5vw;
  }


   @media (max-width: 1100px) {
    width: 5vw;
    margin-top: -3vw;
  }

    @media (max-width: 968px) {
    width: 6vw;
    margin-top: -1vw;
    margin-left: -4vw;

  }

  @media (max-width: 868px) {
    width: 6vw;
    margin-left: -4vw;
    margin-top: -1vw;

  }

  @media (max-width: 768px) {
    width: 6vw;
    margin-left: 9vw;
    margin-top: -2vw;
  }

   @media (max-width: 608px) {
    width: 7vw;
    margin-left: 9vw;
  }

  @media (max-width: 508px) {
    width: 7.5vw;
    margin-top: -4vw;
    margin-left: 9vw;
  }

  @media (max-width: 408px) {
    width: 9vw;
    margin-left: 8vw;
    margin-top: -8vw;

  }
`;

const StyledNavLink = styled(NavLink)`
  font-family: "Fira Mono", monospace;
  text-decoration: none;
  color: inherit;
   font-size: calc(0.5vw + 10px);
  border-bottom: 0.9px solid ${theme.secondaryTextColor};


  @media (max-width: 2100px) {
}

@media (max-width: 2000px) {
}

@media (max-width: 1900px) {
    top: 7vw;
}

@media (max-width: 1800px) {
}

@media (max-width: 1700px) {
    top: 8vw;
}

@media (max-width: 1500px) {
}

@media (max-width: 1300px) {
    top: 9vw;
}

@media (max-width: 1100px) {
}

 @media (max-width: 768px) {
  font-size: 2.5vw;
  }

   @media (max-width: 560px) {
   font-size: 3vw;
  }

`;

