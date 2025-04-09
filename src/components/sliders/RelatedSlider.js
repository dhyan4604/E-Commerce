import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import productsData from '../../data/productsData';
import ProductCard from '../product/ProductCard';

import 'swiper/scss';
import 'swiper/scss/pagination';

const RelatedSlider = ({ category }) => {
    if (!category) return null;

    // 🔁 Normalize category names to match
    const normalizeCategory = (cat) => {
        const map = {
            'men': 'men',
            'mens-clothing': 'men',
            'men clothing': 'men',
            'women': 'women',
            'womens-clothing': 'women',
            'women clothing': 'women',
            'electronics': 'electronics',
            'gadgets': 'electronics',
            'jewelery': 'jewelery',
        };

        return map[cat?.toLowerCase().trim()] || cat?.toLowerCase().trim();
    };

    const normalizedCategory = normalizeCategory(category);

    // 🔍 Try to find related products from static data
    let relatedProduct = productsData.filter(
        item => normalizeCategory(item.category) === normalizedCategory
    );

    // ⚠️ If no related products found, show 4 static items as fallback
    if (relatedProduct.length === 0) {
        relatedProduct = productsData.slice(0, 4);
    }

    return (
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={10}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 4 },
            }}
            className="related_swiper"
        >
            {
                relatedProduct.map(item => (
                    <SwiperSlide key={item.id}>
                        <ProductCard {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default RelatedSlider;
