import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import styled from 'styled-components';
import { useBasket } from "../basket/BasketContext";
import { ProductType } from "../../store/useProducts";
import {
  Compound,
  Price,
  StyledButton,
  StyledProductDetail,
  Title
} from "./_stylesProductDetail";
import ProductGallery from "./ProductGallery";

type ProductDetailProps = {
  products: ProductType[];
};

const modelUrls: { [key: string]: string } = {
  pinkShirt: 'https://vyacheslavna.ru/images/pink_shirt.jpg',
  jacket: 'https://vyacheslavna.ru/images/jacket.jpg',
  corset: 'https://vyacheslavna.ru/images/corset.jpg',
  dress: 'https://vyacheslavna.ru/images/dress.jpg',
  blueShirt: 'https://vyacheslavna.ru/images/blue_shirt.jpg',
  batistSet: 'https://vyacheslavna.ru/images/batist_big.jpg',
  skirt: 'https://vyacheslavna.ru/images/skirt.jpg',
};
const ProductDetail = ({ products }: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);

  const { addToBasket } = useBasket();
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToBasket = () => {
    if (selectedSize) {
      const productWithSize: ProductType = { ...product, sizeSelect: selectedSize };
      addToBasket(productWithSize);
      setSelectedSize('');
    }
  };

  const getSizeQuantity = (size: string) => {
    const sizeKey = `size_${size.toLowerCase()}_quantity` as keyof ProductType;
    return product[sizeKey] as number;
  };

  const getHeaderNames = (sizeChart: Record<string, any>) => {
    const firstSize = Object.keys(sizeChart)[0];
    if (!firstSize) return [];
    return Object.keys(sizeChart[firstSize]);
  };

  const getLabelText = (key: string) => {
    switch (key) {
      case 'width':
        return 'Ширина';
      case 'length':
        return 'Длина';
      case 'sleeve_length':
        return 'Длина рукава';
      case 'chest_circumference':
        return 'Обхват груди';
      case 'waist_circumference':
        return 'Обхват талии';
      default:
        return key;
    }
  };

  return (
    <StyledProductPage>
      <StyledProductDetail>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductGallery 
              images={[product.imgUrl]} 
              modelPath="/models/jacket_model.glb" 
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Title>{product.title}</Title>
            <Compound>{product.compound}</Compound>
            <Price>{product.price}₽</Price>

            <SizeSelector>
              {product.sizes.map((size) => (
                <SizeButton
                  key={size}
                  isSelected={size === selectedSize}
                  isAvailable={getSizeQuantity(size) > 0}
                  onClick={() => handleSizeChange(size)}
                >
                  <span>{size}</span>
                </SizeButton>
              ))}
            </SizeSelector>

            {product.size_chart ? (
              <SizeChartWrapper>
                <SizeRow>
                  <SizeHeaderText>Размерная сетка</SizeHeaderText>
                  {getHeaderNames(product.size_chart).map((key) => (
                    <SizeHeaderText key={key}>{getLabelText(key)}</SizeHeaderText>
                  ))}
                </SizeRow>
                {Object.keys(product.size_chart).map((size) => (
                  <SizeRow key={size}>
                    <SizeHeader>{size}</SizeHeader>
                    {Object.entries(product.size_chart[size]).map(([key, value]) => (
                      <SizeInfo key={key}>{value}</SizeInfo>
                    ))}
                  </SizeRow>
                ))}
              </SizeChartWrapper>
            ) : (
              <div>Размерная сетка недоступна</div>
            )}

            <StyledButton
              sx={{ textTransform: 'none' }}
              onClick={handleAddToBasket}
              disabled={!selectedSize}
            >
              Добавить в корзину
            </StyledButton>
          </Grid>
        </Grid>
      </StyledProductDetail>
    </StyledProductPage>
  );
};

// Стили
const SizeSelector = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const SizeButton = styled.div<{ isSelected: boolean; isAvailable: boolean }>`
  position: relative;
  padding: 8px 16px;
  font-size: 24px;
  color: ${({ isAvailable, isSelected }) => 
    isAvailable ? (isSelected ? 'black' : '#333') : '#ccc'};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.5)};
  transition: transform 0.2s ease, color 0.2s ease;
  border-radius: 4px;

  &:hover span, &:focus span {
    transform: ${({ isAvailable }) => (isAvailable ? 'scale(1.1)' : 'none')};
    color: ${({ isAvailable }) => (isAvailable ? 'black' : '#ccc')};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ isAvailable, isSelected }) =>
      isSelected ? 'black' : (isAvailable ? '#333' : '#ccc')};
    transition: background-color 0.3s;
  }

  &:not(:last-child)::before {
    content: '/';
    position: absolute;
    right: -10px;
    color: #ccc;
    font-size: 24px;
  }

  span {
    display: inline-block;
    transition: transform 0.2s ease, color 0.2s ease;
  }
`;

const StyledProductPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SizeChartWrapper = styled.div`
  margin-top: 10px;
`;

const SizeRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const SizeHeader = styled.div`
  font-weight: bold;
  flex: 1;
`;

const SizeInfo = styled.div`
  flex: 1;
  text-align: center;
`;

const SizeHeaderText = styled.div`
  flex: 1;
  text-align: center;
  color: #A9A9A9;
`;

export default ProductDetail;