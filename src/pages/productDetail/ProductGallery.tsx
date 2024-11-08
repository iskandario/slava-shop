import React, { useState, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Scrollbar } from 'swiper/modules';
import ModelViewer from './ModelViewer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

interface ProductGalleryProps {
  images: string[];
  modelPath?: string;
}

const ProductGallery: FC<ProductGalleryProps> = ({ images, modelPath }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', height: '500px' }}>
      <div style={{ width: '70%', marginRight: '20px', position: 'relative' }}>
        <Swiper
          style={{ width: '100%', height: '100%' }}
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs, Scrollbar]}
          scrollbar={{ hide: false, draggable: true }}
          className="mySwiper2"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Product ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
                onError={(e) => {
                  console.error(`Error loading image: ${img}`);
                  e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                }}
              />
            </SwiperSlide>
          ))}
          {modelPath && (
            <SwiperSlide>
              <ModelViewer modelPath={modelPath} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <div style={{ width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          direction="vertical"
          className="mySwiper"
          style={{ width: '100%', height: '100%' }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{ height: '100px' }}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                onError={(e) => {
                  console.error(`Error loading thumbnail: ${img}`);
                  e.currentTarget.src = 'https://via.placeholder.com/100?text=Thumb+Not+Found';
                }}
              />
            </SwiperSlide>
          ))}
          {modelPath && (
            <SwiperSlide style={{ height: '100px', position: 'relative' }}>
              <img
                src="/assets/images/model_thumbnail.png" // замените на путь к миниатюре 3D модели
                alt="3D Model Thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
              />
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '50%',
                padding: '4px 6px',
                fontSize: '12px',
                color: '#333',
                fontWeight: 'bold',
              }}>
                360°
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;