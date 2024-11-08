import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../../_globalStyles/theme';
import { ProductType } from "../../../../store/useProducts";
import fonImage from '/Users/iskandargarifullin/Documents/GitHub/slava-shop/src/assets/images/fon.jpeg';

type CatalogProps = {
  products: ProductType[];
};

export const Catalog = ({ products }: CatalogProps) => {
  const navigate = useNavigate();

  // Список URL для изображений
  const imageUrls: { [key: string]: string } = {
    pinkShirt: 'https://vyacheslavna.ru/images/pink_shirt.jpg',
    jacket: 'https://vyacheslavna.ru/images/jacket.jpg',
    corset: 'https://vyacheslavna.ru/images/corset.jpg',
    dress: 'https://vyacheslavna.ru/images/dress.jpg',
    blueShirt: 'https://vyacheslavna.ru/images/blue_shirt.jpg',
    batistSet: 'https://vyacheslavna.ru/images/batist_big.jpg',
    skirt: 'https://vyacheslavna.ru/images/skirt.jpg',
  };

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const renderProducts = () => {
    return (
      <>
        <SmallCard key={'1'} onClick={() => handleCardClick('1')}>
          <Image src={imageUrls.pinkShirt} alt="Рубашка PINK" />
          <Title>Рубашка PINK →</Title>
        </SmallCard>

        <DoubleCard>
          <MediumCard key={'2'} onClick={() => handleCardClick('2')}>
            <Image src={imageUrls.jacket} alt="Жакет" />
            <Title>Жакет →</Title>
          </MediumCard>
          <MediumCard key={'3'} onClick={() => handleCardClick('3')}>
            <Image src={imageUrls.corset} alt="Корсет White Swan" />
            <Title>Корсет White Swan →</Title>
          </MediumCard>
        </DoubleCard>

        <GroupedCardContainer>
          <Image src={imageUrls.batistSet} alt="Batist Set" />
          <Title>Batist Set</Title>
          <GroupedButtons>
            <TextButton onClick={() => handleCardClick('4')}>Рубашка →</TextButton>
            <TextButton onClick={() => handleCardClick('5')}>Юбка →</TextButton>
          </GroupedButtons>
        </GroupedCardContainer>

        <StackedCard>
          <MediumCard key={'6'} onClick={() => handleCardClick('6')}>
            <Image src={imageUrls.blueShirt} alt="Рубашка BLUE" />
            <Title>Рубашкa BLUE →</Title>
          </MediumCard>

          <MediumCard key={'7'} onClick={() => handleCardClick('7')}>
            <Image src={imageUrls.dress} alt="Платье Dream Dress" />
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
  margin: 50px 80px;
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
    @media (min-width: 2000px) {
      margin: 100px auto;
    }
      @media (min-width: 2500px) {
      margin: 120px auto;
    }

      @media (min-width: 2800px) {
      margin: 170px auto;
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
  margin-left: -10vw;
  margin-top: 2vw;
  width: 80%;


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