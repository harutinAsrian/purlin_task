import { FC } from 'react';

import Slider from 'react-slick';

interface Props {
  images: string[];
}

const Carousel: FC<Props> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <Slider {...settings}>
      {images.map((image, idx) => (
        <div className="" key={idx}>
          <img src={image} alt="room_image" className="w-full aspect-video object-cover" />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
