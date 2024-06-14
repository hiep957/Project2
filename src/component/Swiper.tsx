import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Swiper1 = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="w-full h-[500px] flex ">
        <SwiperSlide className="flex justify-center items-center">
          <img src="src/assets/slide/img1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <img src="src/assets/slide/img2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <img src="src/assets/slide/img3.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Swiper1;
