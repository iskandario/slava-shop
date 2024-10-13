import React from 'react';
import LargePhoto from "../../../../../assets/images/catalogmain_photo.jpg";
import SmallPhoto from "../../../../../assets/images/smallMainPage.jpg";
import {
	FirstBigDiv, FourTextDiv,
	OneTextDiv,
	PhotoDescription,
	SecondBigDiv,
	StyledMainDiv,
	StyledMainGrid, ThreeTextDiv, TwoTextDiv
} from "./_stylesDescription";

type StoreDescriptionProps = {
	scrollToCatalog: () => void;
};

export const StoreDescription = ({ scrollToCatalog }: StoreDescriptionProps) => {
	const handleCatalogClick = () => {
		scrollToCatalog(); // Выполняем прокрутку сразу после открытия каталога
	};

	return (
		<StyledMainDiv>
			<StyledMainGrid>
				<FirstBigDiv>
					<OneTextDiv style={{ alignItems: "flex-start" }}>
						<p>VYACHESLÁVNA начинает свое путешествие, вкладывая в каждый шов и каждый паттерн бесценные частицы творчества</p>
					</OneTextDiv>
					<TwoTextDiv>
						<p>как распускающийся бутон редкого цветка, медленно и уверенно раскрывающий свое великолепие</p>
					</TwoTextDiv>
				</FirstBigDiv>

				<SecondBigDiv>
					<ThreeTextDiv>
						<PhotoDescription>
							<a onClick={handleCatalogClick}>К каталогу →</a>
							{/* Используем тег <picture> для замены изображений */}
							<picture>
								<source media="(max-width: 1000px)" srcSet={SmallPhoto} />
								<img src={LargePhoto} alt="Main Catalog" />
							</picture>
						</PhotoDescription>
					</ThreeTextDiv>
					<FourTextDiv>
						<p>Каждое изделие — воплощение женственности, капля изысканности, которую можно почувствовать, дотронувшись до ткани</p>
					</FourTextDiv>
				</SecondBigDiv>
			</StyledMainGrid>
		</StyledMainDiv>
	);
};