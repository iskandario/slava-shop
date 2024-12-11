import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Basket} from './pages/basket/Basket';
import {HomePage} from './pages/homePage/HomePage';
import {Navigation} from './components/navigator/Navigator';
import ProductDetail from "./pages/productDetail/ProductDetail";
import {PageNotFound} from "./components/404/PageNotFound";
import {Footer} from "./components/footer/Footer";
import {BasketProvider} from './pages/basket/BasketContext';
import styled from "styled-components";
import OrderForm from "./pages/orderForm/OrderForm";
import PaymentStatus from "./pages/paymentStatus/PaymentStatus";
import useProducts, {ProductType} from "./store/useProducts";
import Loading from "./pages/loading/Loading";

function App() {
	const [products, setProducts] = useProducts();  // Хук для работы с продуктами
	const [loading, setLoading] = useState(true);   // Индикатор загрузки
	const [error, setError] = useState('');         // Переменная для хранения ошибки

	// Эффект для загрузки данных
	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch('https://vyacheslavna.ru/products.php'); // URL для загрузки данных с сервера
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: ProductType[] = await response.json();
				setProducts(data);  // Устанавливаем данные продуктов с сервера
			} catch (e) {
				if (e instanceof Error) {
					setError(e.message);
				} else {
					setError('An unexpected error occurred');
				}
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	const AppRender = () => {
		return (
			<BasketProvider>
				<StyledApp className="App">
					<Navigation/>
					<Content>
					<Routes>
						<Route path="/" element={<HomePage products={products}/>}/>
						<Route path="/basket" element={<Basket/>}/>
						<Route path="/order" element={<OrderForm/>}/>
						<Route path="/product/:id" element={<ProductDetail products={products}/>}/>
						<Route path="/order/payment-status/:orderId" element={<PaymentStatus/>}/>
						<Route path="/404" element={<PageNotFound/>}/>
						<Route path="*" element={<Navigate to="/404"/>}/>
					</Routes>
					</Content>
					<Footer/>
				</StyledApp>
			</BasketProvider>
		)
	}

	// Отображение загрузки
	if (loading) {
		return (
			<BasketProvider>
				<StyledApp>
					<Navigation/>
					<Loading/>
				</StyledApp>
			</BasketProvider>
		)
	}

	// Временное решения для локального тестирования
	if (error) {
		return (
			<>
				<AppRender/>
				<ErrorP>Режим ошибки</ErrorP>
			</>
		);
	}

	return <AppRender/>
}

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1 0 auto; /* Заставляет зайти оставшееся пространство */

`;

const Content = styled.div`
flex: 1; 

`

const ErrorP = styled.p`
	background-color: orange;
  color: red;
  z-index: 9;
  font-size: 50px;
  font-weight: 800;
  opacity: 0.4;
  font-family: "Fira Mono", monospace;
`;