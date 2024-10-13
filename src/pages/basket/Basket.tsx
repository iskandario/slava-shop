import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../../_globalStyles/theme';
import { Button } from '@mui/material';
import { useBasket } from "./BasketContext";
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import { ProductType } from "../../store/useProducts";

type Props = {};

export const Basket = (props: Props) => {
	const { basket, removeProductToBasket } = useBasket();
	const navigate = useNavigate();

	const handleOrderClick = () => {
		navigate('/order', {
			state: {
				products: Object.values(groupedBasket),
				total: totalBasket
			}
		});
	};

	// Сгруппируем товары по их ID и размеру
	const groupedBasket = basket.reduce((acc, product: ProductType) => {
		const key = `${product.id}-${product.sizeSelect}`; // Ключ для группировки по ID и размеру
		if (acc[key]) {
			acc[key].quantity += 1;
		} else {
			acc[key] = { ...product, quantity: 1 };
		}
		return acc;
	}, {} as Record<string, ProductType & { quantity: number }>);

	let totalBasket: number = 0;

	return (
		<StyledBasket>
			<StyledBackButton>
        <BackButton />
      </StyledBackButton>
			<div>Корзина</div>
			{basket.length === 0 ? (
				<EmptyBasket>Ваша корзина пуста</EmptyBasket>
			) : (
				<ProductList>
					{Object.values(groupedBasket).map((product) => {
						totalBasket += product.price * product.quantity;
						return (
							<ProductCard key={`${product.id}-${product.sizeSelect}`}>
								<ProductImage src={product.imgUrl} alt={product.title} />
								<ProductDetails>
									<ProductTitle>{product.title}</ProductTitle>
									<ProductSize>Размер: {product.sizeSelect}</ProductSize> {/*выбранный размер*/}
									<ProductPrice>{product.price * product.quantity}₽</ProductPrice>
									<ProductQuantity>{product.quantity} шт</ProductQuantity> {/*количество товара выбранного размера*/}
								</ProductDetails>
								<StyledButton onClick={() => removeProductToBasket(product.id)}>x</StyledButton>
							</ProductCard>
						);
					})}
				</ProductList>
			)}
			<SummaryDiv>
				<span>Всего: {totalBasket}₽</span>
				<StyledButton sx={{ textTransform: 'none' }} onClick={handleOrderClick}>Оформить заказ</StyledButton>
			</SummaryDiv>
		</StyledBasket>
	);
};

const StyledBasket = styled.div`
  font-family: 'NEXT ART', sans-serif !important;
  font-weight: 500;
  line-height: 1.5;
  button{
    font-family: "Fira Mono", monospace;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EmptyBasket = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  margin: 0;
`;

const ProductSize = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: ${theme.secondaryTextColor};
`;

const ProductPrice = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: ${theme.mainTextColor};
`;

const ProductQuantity = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: ${theme.secondaryTextColor};
`;

const StyledButton = styled(Button)`
  && {
    font-size: 16px;
    background-color: ${theme.mainBackgroundColor};
    color: ${theme.mainTextColor};
    border-radius: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: transparent;
      color: ${theme.mainTextColor};
      box-shadow: none;
    }
  }
`;

const SummaryDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fira Code", monospace;
`;

const StyledBackButton = styled.div`
  position: absolute;
  top: 30px;
  z-index: 10;

  button {
    font-size: 16px;
    font-family: 'Fira Mono', monospace;
    background-color: ${theme.mainBackgroundColor};
    color: ${theme.mainTextColor};
    border-radius: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: transparent;
      color: ${theme.secondaryTextColor};
      box-shadow: none;
    }
  }
`;

export default Basket;
