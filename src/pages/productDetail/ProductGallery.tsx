import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import styled from 'styled-components';
// @ts-ignore
import ModelViewer from './ModelViewer';
import type { Swiper as SwiperInstance } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface ProductGalleryProps {
  images: string[];
  modelPath?: string;
  productId: string;
}

const modelThumbnails: { [key: string]: string } = {
  "1": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/pink_shirt.png",
  "2": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/jacket.png",
  "3": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/corset.png",
  "4": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/batist.png",
  "5": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/batist.png",
  "6": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/blue_shirt.png",
  "7": "https://vyacheslavnabrand.ru/SOURCE/images/small_images/dress.png",
};



const GalleryContainer = styled.div`
  display: flex;
  padding-top: 0vw;
  margin: 2vw auto;
 transition: width 0.3s ease-in-out;

  @media (min-width: 768px) {
    margin-left: 5vw;
    width: clamp(70%, 80%, 100%); 
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }




`;

const MainSwiperContainer = styled.div`
  width: 100%;
  margin-right: -5px;
  position: relative;

  @media (min-width: 769px) {
    max-width: calc(100% - 20%); /* Основной блок занимает 80% ширины контейнера */
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    padding: 0; 
  }

   .swiper {
    padding-right: 0 !important; /* Снимаем padding у .swiper */
  }
`;

const VerticalThumbnailsContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row; 
  justify-content: flex-start;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const VerticalScrollWrapper = styled.div`
  position: relative;
  height: 100%;
  margin-top: 0vw;
  width:4px; 
  background-color: #C0C0C0; 
  border-radius: 4px; 
  margin-left: 5px; 
  flex-shrink: 0; 




  


`;

const VerticalScrollBar = styled.div<{ height: string}>`
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%;
  height: ${(props) => props.height}; 
  background-color: #333; 
  border-radius: 4px; 
  transition: all 0.3s ease; 

   @media (max-width: 768px) {
    display: none;
  }
`;

const HorizontalScrollBar = styled.div<{ scrollwidth: string }>`
  width: ${(props) => props.scrollwidth};
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: width 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HorizontalScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 4px; 
  margin-top: 10px;
  background-color: #C0C0C0; 
  border-radius: 4px; 

  @media (max-width: 768px) {
    display: none; 
  }
`;

const ThumbnailImage = styled.img`
  width: 70%;
  height: auto; /* Адаптируем высоту к ширине */
  max-width: 130px; /* Устанавливаем максимальную ширину */
  max-height: 130px; /* Устанавливаем максимальную высоту */
  object-fit: contain; /* Сохраняем соотношение сторон */
  border-radius: 4px;
  cursor: pointer;

  
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;

  
  img, canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0; /* Убираем возможные отступы */
    padding: 0; /* Убираем возможные внутренние отступы */
    display: block;



  

    

   

  }
`;

const MobileScrollWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #C0C0C0;
  border-radius: 2px;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
  }
`;






const ProductGallery: React.FC<ProductGalleryProps> = ({ images, modelPath, productId }) => {
  const mainSwiperContainerRef = useRef<HTMLDivElement | null>(null);
  const [verticalScrollHeight, setVerticalScrollHeight] = useState<string>('0px');
  const [verticalScrollOffset, setVerticalScrollOffset] = useState<string>('0%');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);

  const totalSlides = images.length + (modelPath ? 1 : 0);
  const scrollWidth = `${((activeIndex + 1) / totalSlides) * 100}%`;
  const scrollHeight = `${((activeIndex + 1) / totalSlides) * 100}%`;  

  const imageAspectRatio = images.length > 1 
    ? (() => {
        const img = new Image();
        img.src = images[1];
        return img.naturalWidth && img.naturalHeight
          ? img.naturalWidth / img.naturalHeight
          : 1;
      })()
    : 1;

    useEffect(() => {
      const updateScrollBar = () => {
        if (mainSwiper && mainSwiperContainerRef.current) {
          const totalSlides = mainSwiper.slides.length;
          const currentSlide = mainSwiper.activeIndex + 1; // Индексы начинаются с 0
          const progress = currentSlide / totalSlides; // Прогресс от 0 до 1
          const scrollBarHeight = `${progress * 100}%`; // Высота пропорциональна прогрессу
    
          setVerticalScrollHeight(scrollBarHeight);
        }
      };
    
      if (mainSwiper) {
        mainSwiper.on('slideChange', updateScrollBar); // Обновляем на смене слайда
        updateScrollBar(); // Вызываем при первом рендере
      }
    
      return () => {
        if (mainSwiper) {
          mainSwiper.off('slideChange', updateScrollBar); // Отписываемся
        }
      };
    }, [mainSwiper]);

  return (
    <GalleryContainer>
   <MainSwiperContainer ref={mainSwiperContainerRef}>   
        <Swiper
          onSwiper={setMainSwiper}
          style={{ width: '100%', height: '100%',    paddingRight: '5vw' 
          }}
          spaceBetween={10}
          navigation={false}
          onSlideChange={(swiper: SwiperInstance) => setActiveIndex(swiper.activeIndex)}
          className="mainSwiper"
        >
          {images.map((img, index) => (
            <StyledSwiperSlide key={index}>
              <img
                src={img}
                alt={`Product ${index + 1}`}
                onError={(e) => {
                  console.error(`Error loading image: ${img}`);
                  e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                }}
              />
          
            </StyledSwiperSlide>
          ))}
          {modelPath && (
            <StyledSwiperSlide>
              <ModelViewer 
                modelPath={modelPath} 
                productId={productId} 
                imageAspectRatio={imageAspectRatio} 
              />
            </StyledSwiperSlide>
          )}
        </Swiper>

        <MobileScrollWrapper>
          <HorizontalScrollBar scrollwidth={scrollWidth} />
        </MobileScrollWrapper>
      </MainSwiperContainer>

      <VerticalThumbnailsContainer>
      <VerticalScrollWrapper>
      <VerticalScrollBar height={verticalScrollHeight} />    
       </VerticalScrollWrapper>
<div
  style={{
    position: 'relative', 
    height: '100%',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '0'

  }}
>
  <Swiper
    spaceBetween={10}
    slidesPerView="auto" 
    freeMode={true}
    watchSlidesProgress={true}
    modules={[FreeMode, Navigation]}
    direction="vertical"
    className="thumbSwiper"
    onClick={(swiper: SwiperInstance) => setActiveIndex(swiper.clickedIndex || 0)}
    style={{
      width: 'calc(100% - 16px)', 
      height: 'auto', 
      margin: '0 auto', 
      padding: '0', 

    }}
  >
    {images.map((img, index) => (
      <SwiperSlide
        key={index}
        style={{
          width: '10vw',
          height: '10vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        
        }}
      >
        <ThumbnailImage
          src={img}
          alt={`Thumbnail ${index + 1}`}
          onClick={() => mainSwiper?.slideTo(index)}
        />
      </SwiperSlide>
    ))}
    {modelPath && modelThumbnails[productId] && (
      <SwiperSlide
        style={{
          width: '10vw',
          height: '10vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0', 
          

        }}
      >
        <ThumbnailImage
          src={modelThumbnails[productId]}
          alt="3D Model Thumbnail"
          onClick={() => mainSwiper?.slideTo(images.length)}
        />
      </SwiperSlide>
    )}
  </Swiper>
</div>
       
      </VerticalThumbnailsContainer>
    </GalleryContainer>
  );
};

export default ProductGallery; 