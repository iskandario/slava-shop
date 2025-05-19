import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../../_globalStyles/theme';
import { ProductType } from "../../../../store/useProducts";
import { forwardRef } from 'react';

type CatalogProps = {
  products: ProductType[];
};

export const Catalog = forwardRef<HTMLDivElement, CatalogProps>(({ products }, ref) => {
  const navigate = useNavigate();

  const imageUrls: { [key: string]: string } = {
    valentineHim: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/valentine_him.jpg',
    valentineHer: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/valentine_her.jpg',
    jacket: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/jacket.jpg',
    corset: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/corset.jpg',
    dress: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/dress.jpg',
    batistSet: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/batist_big.jpg',
    skirt: 'https://vyacheslavnabrand.ru/SOURCE/images/catalog/skirt.jpg',
  };

  const handleCardClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <StyledCatalog ref={ref}>
      <TopRow>
        <SmallCard key={'2'} onClick={() => handleCardClick('2')}>
          <Image src={imageUrls.jacket} alt="Жакет" />
          <Title>Жакет →</Title>
        </SmallCard>

        <DoubleCard>
          <MediumCard key={'8'} onClick={() => handleCardClick('8')}>
            <Image src={imageUrls.valentineHim} alt="Рубашка for HIM" />
            <Title>
              Рубашка Valentine’s → <br />
              <ValentineLabel>for HIM</ValentineLabel>
            </Title>
          </MediumCard>

          <MediumCard key={'9'} onClick={() => handleCardClick('9')}>
            <Image src={imageUrls.valentineHer} alt="Рубашка for HER" />
            <Title>
              Рубашка Valentine’s → <br />
              <ValentineLabel>for HER</ValentineLabel>
            </Title>
          </MediumCard>
        </DoubleCard>
      </TopRow>

      <BottomRow>
        <GroupedCardContainer>
          <Image src={imageUrls.batistSet} alt="Batist Set" />
          <BatistTitle>Batist Set</BatistTitle>
          <GroupedButtons>
            <Title onClick={() => handleCardClick('4')}>Рубашка →</Title>
            <Title onClick={() => handleCardClick('5')}>Юбка →</Title>
          </GroupedButtons>
        </GroupedCardContainer>

        <StackedCard>
          <MediumCard key={'3'} onClick={() => handleCardClick('3')}>
            <Image src={imageUrls.corset} alt="Корсет White Swan" />
            <Title>Корсет White Swan →</Title>
          </MediumCard>

          <MediumCard key={'7'} onClick={() => handleCardClick('7')}>
            <Image src={imageUrls.dress} alt="Платье Dream Dress" />
            <Title>Платье Dream Dress →</Title>
          </MediumCard>
        </StackedCard>
      </BottomRow>
    </StyledCatalog>
  );
});

Catalog.displayName = "Catalog";

const StyledCatalog = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6vw;
  margin: 7vw;
  padding: 2vw;
  max-width: 100vw;

  @media (max-width: 768px) {
    gap: 5vw;
  }
`;

const TopRow = styled.div`
  display: flex;
  gap: 8vw;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10vw;
  margin-top: 6vw;

  @media (max-width: 768px) {
    margin-top: -4vw;
    flex-direction: column;
  }
`;

const SmallCard = styled.div`
  width: 12vw;
  height: 20vw;
  cursor: pointer;
  margin-top: 5vw;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const MediumCard = styled.div`
  width: 25vw;
  height: 35vw;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 2vw auto;
  }
`;

const GroupedCardContainer = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  margin-top: 8vw;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: -2vw;
  }
`;

const DoubleCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5vw;
  width: fit-content;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 2vw;
  }
`;

const GroupedButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 3vw;
`;

const StackedCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8vw;
  width: 25vw;
  margin-top: 3vw;

  @media (max-width: 768px) {
    width: 100%;
    gap: 5vw;
    margin-top: 0vw;

  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
`;

const ValentineLabel = styled.span`
  color: rgb(174, 12, 12);
  font-weight: 500;
  display: inline-block;
  text-align: left;
  width: 100%;
`;

export const Title = styled.h3`
  white-space: nowrap;
  font-family: "Fira Mono", monospace;
  font-size: calc(1.2vw + 5px);
  font-weight: 400;
  margin-top: 1rem;
  text-align: center;
  color: black;
  width: fit-content;
  border-bottom: 0.9px solid ${theme.secondaryTextColor};

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }

  @media (max-width: 560px) {
    font-size: 3.5vw;
  }
`;

export const BatistTitle = styled.h3`
  white-space: nowrap;
  font-family: "Fira Mono", monospace;
  font-size: calc(1.2vw + 5px);
  font-weight: 400;
  text-align: left;
  margin-top: 1rem;
  color: black;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }

  @media (max-width: 560px) {
    font-size: 3.5vw;
  }
`;
