import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBasket } from "../basket/BasketContext";
import { theme } from '../../_globalStyles/theme';
import { ProductType } from "../../store/useProducts";
import { ThemeProvider } from '@mui/material/styles';
import themes from './ThemeProvider';
import {
  Compound,
  Price,
  StyledButton,
  StyledProductDetail,
  Title
} from "./_stylesProductDetail";
import ProductGallery from "./ProductGallery";
import BackButton from "../../components/BackButton"; 


const imageUrls: { [key: string]: string[] } = {
  "1": [
    "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/pink1.jpg",
    "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/pink2.jpg"
  ],
  "2": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/jacket.jpg"],
  "3": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/corset.jpg"],
  "4": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/shirt1.jpg",
        "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/shirt2.jpg"
  ],
  "5": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/skirt1.jpg"],
  "6": [
    "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/blue_shirt1.jpg",
    "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/blue_shirt2.jpg"
  ],
  "7": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/dress.jpg"],
  "8": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/valentine_him1.jpg",
  "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/valentine_him2.jpg",
  "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/valentine_him3.jpg"],
  "9": ["https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/valentine_her1.jpg",
  "https://vyacheslavnabrand.ru/SOURCE/images/product_detail_photos/valentine_her2.jpg"],
};

const modelPaths: { [key: string]: string } = {
  "1": "https://vyacheslavnabrand.ru/SOURCE/models/pink_shirt.glb",
  "2": "https://vyacheslavnabrand.ru/SOURCE/models/jacket_model3.glb",
  "3": "https://vyacheslavnabrand.ru/SOURCE/models/corset.glb",
  "4": "https://vyacheslavnabrand.ru/SOURCE/models/batist.glb",
  "5": "https://vyacheslavnabrand.ru/SOURCE/models/batist.glb",
  "6": "https://vyacheslavnabrand.ru/SOURCE/models/blue_shirt.glb",
  "7": "https://vyacheslavnabrand.ru/SOURCE/models/dress.glb",
};

type ProductDetailProps = {
  products: ProductType[];
};

const ProductDetail = ({ products }: ProductDetailProps) => {

  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);
  const { addToBasket } = useBasket();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [animateSizes, setAnimateSizes] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isAddedToBasket, setIsAddedToBasket] = useState(false);

  const sortSizeChart = (sizeChart: Record<string, Record<string, string>>): Record<string, Record<string, string>> => {
    const priorityOrder = ['S', 'M'];
    return Object.fromEntries(
      Object.entries(sizeChart).sort(([keyA], [keyB]) => {
        const indexA = priorityOrder.indexOf(keyA);
        const indexB = priorityOrder.indexOf(keyB);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return keyA.localeCompare(keyB);
      })
    );
  };
  

  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const handleMouseDown = (size: string) => {
    setPressedButton(size);
  };
  const handleMouseUp = () => {
    setPressedButton(null); // Сбрасываем активную кнопку
  };
  
  const handleMouseLeave = () => {
    setPressedButton(null); // Сбрасываем активную кнопку при уходе курсора
  };
  
  const areSizesAvailable = () => {
    if (!product) return false; // Проверяем, существует ли продукт
    return product.sizes.length === 1 && product.sizes[0] === "Единый размер"
      ? product.size_c_quantity > 0
      : product.sizes.some((size) => getSizeQuantity(size) > 0);
  };
  
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Логируем размерную сетку в консоль
    if (product && product.size_chart) {
      console.log(`Размерная сетка для продукта ${product.title}:`, product.size_chart);
    } else if (product) {
      console.log(`Для продукта ${product.title} размерная сетка отсутствует.`);
    }
  }, [id, product]);



  useEffect(() => {
    if (sizeError) {
      const timer = setTimeout(() => {
        setSizeError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [sizeError]);

  if (!product) {
    return <div>Товар не найден</div>;
  }
  const images = imageUrls[id || ''] || [];
  const modelPath = modelPaths[id || ''];

  const handleSizeChange = (size: string) => {
    if (getSizeQuantity(size) > 0) {
      setSelectedSize(size);
      setSizeError(false);

    }
  };

  

  const handleAddToBasket = () => {
    if (product.sizes.length === 1 && product.sizes[0] === "Единый размер") {
      const productWithSize: ProductType = { ...product, sizeSelect: "Единый размер" };
      addToBasket(productWithSize);
      setIsAddedToBasket(true);
      setSizeError(false);
    } else if (product.sizes.filter((size) => getSizeQuantity(size) > 0).length === 1) {
      // Единственный доступный размер
      const availableSize = product.sizes.find((size) => getSizeQuantity(size) > 0);
      if (availableSize) {
        const productWithSize: ProductType = { ...product, sizeSelect: availableSize };
        addToBasket(productWithSize);
        setIsAddedToBasket(true);
        setSizeError(false);
      }
    } else if (selectedSize) {
      const productWithSize: ProductType = { ...product, sizeSelect: selectedSize };
      addToBasket(productWithSize);
      setSelectedSize('');
      setIsAddedToBasket(true);
      setSizeError(false);
    } else {
      setSizeError(true);
      setAnimateSizes(true);
      setTimeout(() => setAnimateSizes(false), 500);
    }
  };





  const getSizeQuantity = (size: string) => {
    if (size === "Единый размер") {
      return product.size_c_quantity || 0; 
    }
    const sizeKey = `size_${size.toLowerCase()}_quantity` as keyof ProductType;
    return product[sizeKey] as number || 0;
  };

  const getHeaderNames = (sizeChart: Record<string, any>) => {
    const firstSize = Object.keys(sizeChart)[0];
    if (!firstSize) return [];
    return Object.keys(sizeChart[firstSize]);
  };

  const getLabelText = (key: string) => {
    switch (key) {
      case 'width':
        return (
          <>
            Ширина
          </>
        );
      case 'length':
        return (
          <>
            Длина
          </>
        );
      case 'sleeve_length':
        return (
          <>
            Длина
            рукава
          </>
        );
      case 'chest_circumference':
        return (
          <>
            Обхват
            груди
          </>
        );;
      case 'waist_circumference':
        return (
          <>
            Обхват
            талии
          </>
        );
      case 'up_length':
        return (
          <>
            Длина
            верха
          </>
        );
      case 'skirt_length':
        return (
          <>
            Длина
            юбки
          </>
        );
          
      default:
        return key;
    }
  };

  return (
    <ThemeProvider theme={themes}>
    <StyledProductPage>
         <StyledBackButton>
        <BackButton />
      </StyledBackButton>
      <StyledProductDetail>
        
        <Grid container spacing={{xs: 0, md: 12 }}>
          <LeftGrid item xs={12} md={6}>
            <ProductGallery images={images} modelPath={modelPath} productId={id || ''} />
          </LeftGrid>

          <RightGrid item xs={12} md={6}
          sx={{
            paddingLeft: { xs: '0', md: '100px' }, 
          }}
          
          >
            <MobileLayout>
              <TitleCompoundWrapper>
              <Title>
  {product.title.includes('for') ? (
    <>
      {product.title.split(' for ')[0]}
      <ValentineLabelBlock>
        FOR {product.title.split('for ')[1]?.toUpperCase()}
      </ValentineLabelBlock>
    </>
  ) : (
    product.title
  )}
</Title>
                <Compound>{product.compound}</Compound>
              </TitleCompoundWrapper>

              <PriceSize>
              <Price>{Number(product.price).toLocaleString('ru-RU')}₽</Price>


              <PositioningWrapper>

              <SizeSelectorWrapper>
              {sizeError && <SizeErrorMessage>Выберите размер</SizeErrorMessage>}

              <SizeSelector>
                {product.sizes.length === 1 && product.sizes[0] === "Единый размер" ? (
                  product.size_c_quantity > 0 ? (
                    <NoSizesAvailable>Единый размер</NoSizesAvailable>
                  ) : (
                    <NoSizesAvailable>Нет в наличии</NoSizesAvailable>
                  )
                ) : product.sizes.filter((size) => getSizeQuantity(size) > 0).length === 1 ? (
                  product.sizes.map((size) =>
                    getSizeQuantity(size) > 0 ? (
                      <OneSizeAvailable key={size}>{size}</OneSizeAvailable>
                    ) : null
                  )
                ) : areSizesAvailable() ? (
                  product.sizes.map((size, index) => (
                    <SizeButton
                      key={size}
                      $isselected={size === selectedSize}
                      $ispressed={pressedButton === size}
                      $isavailable={getSizeQuantity(size) > 0}
                      onClick={() => {
                        setPressedButton(size);
                        setTimeout(() => setPressedButton(null), 200);
                        handleSizeChange(size);
                      }}
                    >
                      <span>{size}</span>
                      {index < product.sizes.length - 1 && <SlashDivider>/</SlashDivider>}
                    </SizeButton>
                  ))
                ) : (
                  <NoSizesAvailable>Нет в наличии</NoSizesAvailable>
                )}
              </SizeSelector>

              </SizeSelectorWrapper>
              </PositioningWrapper>

              </PriceSize>

            </MobileLayout>

            {product.size_chart ? (
            <SizeChartWrapper as="table">
              <thead>
                <tr>
                  <th>Размерная сетка</th>
                  {getHeaderNames(product.size_chart).map((key) => (
                    <th key={key}>{getLabelText(key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(sortSizeChart(product.size_chart)).map(([size, details]) => (
                  <tr key={size}>
                    <td>{size}</td>
                    {Object.entries(details).map(([key, value]) => (
                      <td key={key}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </SizeChartWrapper>
          ) : (
            <div>Размерная сетка недоступна</div>
          )}

            {areSizesAvailable() && (
              <StyledAddToBasketButton onClick={handleAddToBasket}>
                Добавить в корзину
              </StyledAddToBasketButton>
              
            )}

          </RightGrid>
        </Grid>
      </StyledProductDetail>
    </StyledProductPage>
    </ThemeProvider>
  );

};

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row; /* В мобильной версии располагаем компоненты горизонтально */
    justify-content: space-between; /* Разделяем их по краям */
    align-items: center; /* Центрируем их по вертикали */
    gap: 8px; /* Уменьшаем расстояние между компонентами */
  }
`;

const SizeErrorMessage = styled.div`
  position: absolute; 
  top: -1vw; /* Выравниваем по верхней границе SizeSelector */
  left: -calc(100% + 15px); /* Располагаем справа от SizeSelector с отступом */
  text-align: left; /* Текст слева */
  font-size: calc(0.6vw + 5px); 
  color: #ff6b6b; 
  font-family: "Mira Mono", monospace;
  opacity: 0.9;
  white-space: nowrap; /* Отключаем перенос строк */
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    left: auto; 
    top: -2vw;
    right: 0vw; /* Переносим сообщение слева от SizeSelector */
    text-align: right; /* Текст справа */
    font-size: calc(0.8vw + 10px); /* Увеличиваем размер шрифта для мобильных */
  }


    @media (max-width: 508px) {
    left: auto; 
    top: -2.5vw;
    right: 0vw; /* Переносим сообщение слева от SizeSelector */
    text-align: right; /* Текст справа */
    font-size: calc(0.8vw + 8px); /* Увеличиваем размер шрифта для мобильных */
  }
`;
const ValentineLabelBlock = styled.div`
  color: rgb(174, 12, 12);
  font-weight: 600;
  font-size: 1em;
  margin-top: 0.4em;
  text-align: left;
`;


const SizeSelectorWrapper = styled.div`
  position: relative; 
  margin-bottom: 20px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

`;

const PositioningWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;


  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 8px;
  }
`;

const StyledNavLink = styled(NavLink)`
  && {
    margin-top: 20px; /* Добавим отступ между кнопками */
    font-size: calc(0.7vw + 5px);
    font-family: "FiraMono", monospace;
    color: black;


  }
`;


const StyledBackButton = styled.div`
  align-self: flex-start; 
  margin-top: 2vw;
  z-index: 10;
  margin-bottom: 1vw;
  display: flex; /* Включаем Flexbox */
  justify-content: flex-start; 
  text-align: left;
  margin-left: 10%;
  button {

    font-size: calc(0.5vw + 10px);
    font-family: 'Fira Mono', monospace;
    background-color: ${theme.mainBackgroundColor};
    color: ${theme.mainTextColor};

    &:hover {
      background-color: transparent;
      color: ${theme.secondaryTextColor};
      box-shadow: none;
    }
      @media (max-width: 768px) {
     font-size: calc(1.2vw + 10px);
     display: none;
    }
  }
    
`;


const NoSizesAvailable = styled.div`
  font-size: calc(0.3vw + 8px);
  color: #C4C4C4;;
  font-weight: normal;
  text-align: center;
  cursor: not-allowed;

  @media (max-width: 768px) {
    margin-top: -1vw;
    font-size: calc(1vw + 10px);
  }
`;

const OneSizeAvailable = styled.div`
  font-size: calc(0.7vw + 8px);
  color: #C4C4C4;
  font-weight: normal;
  text-align: center;
  cursor: not-allowed;

  @media (max-width: 768px) {
    margin-top: -1vw;
    font-size: calc(1.2vw + 10px);
  }
`

const TitleAndPrice = styled.div`
  display: flex;
  flex-direction: column; /* Элементы в столбик по умолчанию */
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: row; /* Элементы в строку */
    justify-content: space-between; /* Разделяем элементы */
    align-items: flex-start; /* Выравниваем элементы по верхнему краю */
    gap: 10px; /* Добавляем небольшой промежуток */
  }
`;

const PriceSize = styled.div`
display: flex;
gap: 1.5vw;
flex-direction: column;
@media (max-width: 768px) {
align-items: flex-end;
margin-top: 5vw;
  }

`
const TitleCompoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Добавляем расстояние между Title и Compound */

  @media (max-width: 768px) {
    gap: 8px; /* Меньший отступ для мобильной версии */
  }
`;

export const SizeSelector = styled.div`
  display: flex;
  flex-wrap: wrap; /* Разрешаем перенос строк */
  justify-content: flex-start; /* Кнопки начинаются от левого края */
  gap: 16px; /* Расстояние между кнопками */
  margin-top: 10px; 
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  @media (max-width: 768px) {
    margin-top: 0; /* Убираем лишние отступы */
    justify-content: flex-end; 
  }





   @media(max-width: 768px){
    margin-top: 3vw;
  }
`;

const SizeButton = styled.div<{
  $isselected: boolean;
  $isavailable: boolean;
  $ispressed: boolean;
}>`
  display: flex;
  z-index: 10;
  align-items: center;
  justify-content: center;
  font-size: calc(0.7vw + 8px);
  color: ${({ $isavailable, $isselected }) =>
    $isavailable ? ($isselected ? 'black' : '#333') : '#ccc'};
  font-weight: ${({ $isselected }) => ($isselected ? 'bold' : 'normal')};
  cursor: ${({ $isavailable }) => ($isavailable ? 'pointer' : 'not-allowed')};
  opacity: ${({ $isavailable }) => ($isavailable ? 1 : 0.5)};
  transition: transform 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  border-radius: 4px;
  background-color: ${({ $ispressed }) => ($ispressed ? '#ddd' : 'transparent')};
  margin: 0;

  &:active {
    background-color: #bbb;
  }

  @media (max-width: 768px) {
    margin-top: -1vw;
    font-size: calc(1.2vw + 10px);
  }
`;

const SlashDivider = styled.span`
  margin-left: 15px; /* Контролируем отступы вокруг слэша */
  color: #ccc; /* Добавляем цвет для разделителя */
  font-size: 1vw;

  @media(max-width: 768px){
    font-size: 2.5vw;
  }
`;


const LeftGrid = styled(Grid)`


&&{


  @media (max-width: 768px) {
    padding-top: 0vw !important;  
  }

 

}
`


const RightGrid = styled(Grid)`

&&{

 
   
`;

const StyledProductPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0px 20px;
  justify-content: flex-start;
  align-items: center; 
`;

const StyledAddToBasketButton = styled(StyledButton)`
  && {
    font-size: calc(0.8vw + 5px);
    padding-top: 50px;
    padding-bottom: 0px;
    font-family: "FiraMono", monospace;
    color: black;

     @media (max-width: 768px) {
     font-size: calc(1.2vw + 8px);
     }
  }
`;



const SizeChartWrapper = styled.table`
  margin-top: 10px;
  width: 90%;
  border-collapse: collapse;

  @media (max-width:768px) {
    width: 100%;
  }



  th, td {
    padding: 8px; /* Отступы для удобства чтения */
    text-align: left;
  }

  th {
    font-size: calc(0.4vw + 5px);
    white-space: nowrap;
    color: #C4C4C4; /* Можно оставить цвет для заголовков */
    font-weight: normal;

    @media (max-width:1100px) {
      font-size: calc(0.3vw + 5px);
    }
     @media (max-width:768px) {
      font-size: calc(0.8vw + 5px);
    }

    @media (max-width:468px) {
      font-size: calc(0.6vw + 5px);
    }
  }

  td {
    font-size: calc(0.4vw + 5px);
    color: #333; /* Текстовые данные */
    @media (max-width:1100px) {
      font-size: calc(0.3vw + 5px);
    }
    @media (max-width:768px) {
      font-size: calc(0.8vw + 5px);
    }

    @media (max-width:468px) {
      font-size: calc(0.6vw + 5px);
    }
  }

  /* Убираем линии */
  th, td {
    border: none; /* Без рамок */
  }

  /* Убираем фон */
  th {
    background-color: transparent;
  }
`;

export default ProductDetail;