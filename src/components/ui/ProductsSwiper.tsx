"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Navigation } from "swiper/modules";
import { Product } from "@prisma/client";

type Props = {
  products: Product[];
};

const ProductsSwiper: FC<Props> = ({ products }) => {
  return (
    <Swiper
      className="group relative"
      modules={[Navigation]}
      navigation={{
        prevEl: ".prev",
        nextEl: ".next",
      }}
      spaceBetween={16}
      loop
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        560: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard
            product={product}
            href={`/goods/${product.slug}`}
            key={product.id}
          />
        </SwiperSlide>
      ))}
      <button className="prev absolute w-14 h-10 top-1/2 -translate-y-1/2 -left-14 z-10  transition-[0.2s] text-white bg-black bg-opacity-70 group-hover:left-8 m-0 p-0 lg:hover:bg-opacity-80">
        -
      </button>
      <button className="next absolute w-14 h-10 top-1/2 -translate-y-1/2 -right-14 z-10  transition-[0.2s] text-white bg-black bg-opacity-70 group-hover:right-8 m-0 p-0 lg:hover:bg-opacity-80">
        +
      </button>
    </Swiper>
  );
};

export default ProductsSwiper;
