import React, { useRef } from 'react';
import { Main } from './layout/main/Main';
import { Catalog } from './layout/catalog/Catalog';
import { ProductType } from "../../store/useProducts";

type HomePageProps = {
	products: ProductType[];
};

export const HomePage = ({ products }: HomePageProps) => {
	const catalogRef = useRef<HTMLDivElement>(null);

	const scrollToCatalog = () => {
		catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div>
			<Main scrollToCatalog={scrollToCatalog} />
			<Catalog ref={catalogRef} products={products} />
		</div>
	);
};