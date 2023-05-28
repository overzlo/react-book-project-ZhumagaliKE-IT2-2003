import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import './BookList.css';

const BookList = ({ books }) => {
  const settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <Slider {...settings} className="book-slider">
      {books.map((book) => (
        <div key={book.key}>
          <Card className="book-card">
            <Card.Img
              variant="top"
              src={
                book.cover_id
                  ? `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                  : `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              }
              alt={book.title}
              className="book-image"
            />

            <Card.Body>
              <Link to={`/book${book.key.replace('works/', '')}`}>
                <Card.Title className="book-title">{book.title}</Card.Title>
              </Link>

              <Card.Text className="book-year">Year: {book.first_publish_year}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Slider>
  );
};

export default BookList;
