import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }) => {
  return (
    <Slider
      dots={true}
      infinite={true}
      autoplay={true}
      autoplaySpeed={2000}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      className="carousel"
    >
      {data.map((item) => (
        <div key={item.id} className="carousel-item">
          <img className="h-full w-full object-cover" src={item.photo} alt={item.name} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
