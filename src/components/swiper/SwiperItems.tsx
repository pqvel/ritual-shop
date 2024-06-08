"use client";
import { ReactNode, Children, FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

type Props = {
  children: ReactNode[];
};

const SwiperItems: FC<Props> = ({ children }) => {
  return (
    <Swiper
      className={"group relative"}
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
      {Children.map(children, (child, i) => (
        <SwiperSlide className=" max-w-2xl" key={i}>
          {child}
        </SwiperSlide>
      ))}

      <button className="prev flex lg:hidden items-center justify-center absolute w-14 h-10 top-1/2 -translate-y-1/2 -left-14 z-10  transition-[0.2s] text-white bg-black bg-opacity-70 group-hover:left-8 m-0 p-0 lg:hover:bg-opacity-80 rotate-180">
        <svg className="ml-1" width={24} height={24}>
          <use href="/images/sprites.svg#icon-arrow"></use>
        </svg>
      </button>
      <button className="next flex lg:hidden items-center justify-center absolute w-14 h-10 top-1/2 -translate-y-1/2 -right-14 z-10  transition-[0.2s] text-white bg-black bg-opacity-70 group-hover:right-8 m-0 p-0 lg:hover:bg-opacity-80">
        <svg className="ml-1" width={24} height={24}>
          <use href="/images/sprites.svg#icon-arrow"></use>
        </svg>
      </button>
    </Swiper>
  );
};

export default SwiperItems;
