import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BigSlider.css';

const BigSlider = ({ books }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {books.map((book, index) => (
          <div key={book.key} className="slider-item">
            <img
              src={`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
              alt={book.title}
              className={hoveredIndex === index ? 'hovered' : ''}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            />
            <div className="slider-item-title">{book.title}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BigSlider;
