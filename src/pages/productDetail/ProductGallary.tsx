import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Scrollbar } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Импорт стилей
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

interface ProductGalleryProps {
	images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
	// Дублируем изображения для временного теста
	const duplicatedImages = [...images, ...images];

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<div style={{ display: 'flex', maxWidth: '900px', margin: '0 auto', height: '500px' }}>
			<div style={{ width: '70%', marginRight: '20px', position: 'relative' }}>
				<Swiper
					style={{ width: '100%', height: '100%' }}
					spaceBetween={10}
					navigation={false}
					thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
					modules={[Navigation, Thumbs, Scrollbar]}
					scrollbar={{
						hide: false,
						draggable: true,
					}}
					className="mySwiper2"
				>
					{duplicatedImages.map((img, index) => (
						<SwiperSlide key={index}>
							<img
								src={img}
								alt={`Product ${index + 1}`}
								style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} // Используем 'contain' вместо 'cover'
								onError={(e) => {
									console.error(`Error loading image: ${img}`);
									e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
								}}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div style={{ width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={4} // Отображаем 4 миниатюры
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					direction="vertical"
					className="mySwiper"
					style={{ width: '100%', height: '100%' }}
				>
					{duplicatedImages.map((img, index) => (
						<SwiperSlide key={index} style={{ height: '100px' }}> {/* Регулируем высоту миниатюр */}
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
				</Swiper>
			</div>
		</div>
	);
};

export default ProductGallery;