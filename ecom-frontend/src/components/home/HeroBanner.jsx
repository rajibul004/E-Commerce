import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { bannerLists } from "./BannerList";
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="w-full h-screen">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={{ clickable: true }}
        effect="fade"
        className="w-full h-full"
      >
        {bannerLists.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="w-full h-screen bg-center bg-cover flex items-center text-white px-10"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="bg-black bg-opacity-50 p-8 rounded max-w-xl text-left">
                <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
                <h1 className="text-6xl font-extrabold mb-4">{item.subtitle}</h1>
                <p className="text-lg mb-6">{item.description}</p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
