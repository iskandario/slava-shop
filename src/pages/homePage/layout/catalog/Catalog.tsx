import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../../_globalStyles/theme';
import { ProductType } from "../../../../store/useProducts";

type CatalogProps = {
  products: ProductType[];
};

export const Catalog = ({ products }: CatalogProps) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const renderProducts = () => {
    return (
      <>
        {/* Первая строка */}
        <SmallCard key={'1'} onClick={() => handleCardClick('1')}>
          <Image src="https://via.placeholder.com/200x300/FFB6C1/000000?text=PINK" alt="Рубашка PINK" />
          <Title>Рубашка PINK →</Title>
        </SmallCard>

        <DoubleCard>
          <MediumCard key={'2'} onClick={() => handleCardClick('2')}>
            <Image src="https://via.placeholder.com/300x400/8B0000/FFFFFF?text=Jacket" alt="Жакет" />
            <Title>Жакет →</Title>
          </MediumCard>

          <MediumCard key={'3'} onClick={() => handleCardClick('3')}>
            <Image src="https://via.placeholder.com/300x400/FFFFFF/000000?text=Corset" alt="Корсет White Swan" />
            <Title>Корсет White Swan →</Title>
          </MediumCard>
        </DoubleCard>

        {/* Batist Set с рубашкой и юбкой */}
        <GroupedCardContainer>
          <Image src="https://via.placeholder.com/600x800/ADD8E6/000000?text=Batist+Set" alt="Batist Set" />
          <Title>Batist Set</Title>
          <GroupedButtons>
            <TextButton onClick={() => handleCardClick('shirt')}>Рубашка →</TextButton>
            <TextButton onClick={() => handleCardClick('skirt')}>Юбка →</TextButton>
          </GroupedButtons>
        </GroupedCardContainer>

        {/* Рубашка BLUE и Платье Dream Dress в столбик */}
        <StackedCard>
          <MediumCard key={'5'} onClick={() => handleCardClick('5')}>
            <Image src="https://via.placeholder.com/300x400/0000FF/FFFFFF?text=Blue+Shirt" alt="Рубашка BLUE" />
            <Title>Рубашка BLUE →</Title>
          </MediumCard>

          <MediumCard key={'6'} onClick={() => handleCardClick('6')}>
            <Image src="https://via.placeholder.com/300x400/FFD700/000000?text=Dream+Dress" alt="Платье Dream Dress" />
            <Title>Платье Dream Dress →</Title>
          </MediumCard>
        </StackedCard>
      </>
    );
  };

  return <StyledCatalog>{renderProducts()}</StyledCatalog>;
};

const StyledCatalog = styled.section`
  display: grid;
  grid-template-areas: 
    "pinkShirt jacket corset"
    "batistSet batistSet blueShirt"
    "batistSet batistSet dress";
  grid-template-columns: 18vw 32vw 32vw; /* Заменили пиксели на vw для адаптивности */
  gap: 8vw; /* Адаптивный отступ */
  margin: 0 auto;
  padding: 2vw;
  max-width: 100vw;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "pinkShirt"
      "jacket"
      "corset"
      "batistSet"
      "blueShirt"
      "dress";
    gap: 5vw; /* Меньший отступ между элементами */
  }
`;

const SmallCard = styled.div`
  grid-area: pinkShirt;
  width: 15vw;
  height: 23vw; /* Пропорционально ширине */
  cursor: pointer;
  margin-top: 5vw;

  @media (max-width: 1000px) {
    width: 100%; /* Занимает всю ширину контейнера */
    height: auto;
    margin: 2vw auto;
  }
`;

const MediumCard = styled.div`
  width: 25vw;
  height: 35vw;
  cursor: pointer;

  @media (max-width: 1000px) {
    width: 100%; /* Занимает всю ширину */
    height: auto;
    margin: 2vw auto;
  }
`;

const GroupedCardContainer = styled.div`
  grid-area: batistSet;
  width: 40vw;
  height: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  margin-top: 14vw;
  margin-left: 10vw;

  @media (max-width: 1000px) {
    width: 100%;
    height: auto;
    margin: 2vw auto;
  }
`;

const DoubleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
  width: fit-content;

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%; /* Занимает всю ширину */
    gap: 2vw;
  }
`;

const GroupedButtons = styled.div`
  display: flex;
  gap: 3vw;
`;

const TextButton = styled.h3`
  font-family: "Fira Mono", monospace;
  font-weight: 400;
  cursor: pointer;
  color: ${theme.secondaryTextColor};
  border-bottom: 1px solid lightgray;
`;

const StackedCard = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: blueShirt;
  gap: 8vw;
  margin-left: -5vw;
  margin-top: 2vw;

  @media (max-width: 1000px) {
    margin: 2vw auto;
    gap: 5vw;
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
`;

export const Title = styled.h3`
  font-family: "Fira Mono", monospace;
  font-weight: 400;
  margin-top: 1rem;
  text-align: center;
  color: ${theme.secondaryTextColor};
  width: fit-content;
  border-bottom: 1px solid lightgray;
  
  &:hover {
    cursor: pointer;
  }
`;