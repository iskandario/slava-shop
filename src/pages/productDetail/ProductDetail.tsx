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
import ProductGallery from "./ProductGallary";

type ProductDetailProps = {
  products: ProductType[];
};

const ProductDetail = ({ products }: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>();
  
  // Получаем данные продукта из списка продуктов
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

  // Приведение типов для динамической индексации
  const getSizeQuantity = (size: string) => {
    const sizeKey = `size_${size.toLowerCase()}_quantity` as keyof ProductType;
    return product[sizeKey] as number;
  };

  // Заголовки в зависимости от ключей размерной сетки
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
        return key; // возвращаем ключ, если его нет в маппинге
    }
  };

  return (
    <StyledProductPage>
      <StyledProductDetail>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductGallery images={[product.imgUrl]} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Title>{product.title}</Title>
            <Compound>{product.compound}</Compound>
            <Price>{product.price}₽</Price>

            {/* Отображение размеров как кнопок */}
            <SizeSelector>
              {product.sizes.map((size) => (
                <SizeButton
                  key={size}
                  isSelected={size === selectedSize}
                  isAvailable={getSizeQuantity(size) > 0}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeSelector>

            {/* Отображение размерной сетки */}
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

// Стили для селектора размеров
const SizeSelector = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const SizeButton = styled.div<{ isSelected: boolean; isAvailable: boolean }>`
  padding: 8px 16px;
  margin-right: 8px;
  border: 1px solid ${({ isSelected }) => (isSelected ? 'black' : '#ddd')};
  background-color: ${({ isAvailable }) => (isAvailable ? 'white' : '#f4f4f4')};
  color: ${({ isAvailable }) => (isAvailable ? 'black' : '#aaa')};
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.5)};
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