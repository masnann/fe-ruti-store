import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
  };

  return (
    <Slider {...settings}>
      {data.map((item) => (
        <div key={item.id} className="carousel-item">
          <img
            className="w-full h-auto object-cover sm:h-full md:h-full lg:h-full xl:h-full"
            src={item.photo}
            alt={item.name}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
