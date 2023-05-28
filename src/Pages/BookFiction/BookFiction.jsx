import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../API/Loading/Loading';
import Error from '../../API/Error/Error';
import './BookFictions.css';

const BookFiction = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/subjects/${genre}.json?limit=500`)
      .then((response) => {
        const bookData = response.data.works;
        setBooks(bookData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
        setBooks([]);
        setLoading(false);
        setError('Failed to fetch book data.');
      });
  }, [genre]);

  const handleMouseEnter = (book) => {
    setHoveredBook(book);
  };

  const handleMouseLeave = () => {
    setHoveredBook(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <Container>
      <Row>
        <div className='selector'>
      <h2>Genre: {genre}</h2>
      </div>

        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book.key} xs={12} md={4} className="mb-4">
              <Card
                className="book-card bg-dark text-white"
                style={{ height: '100%' }}
                onMouseEnter={() => handleMouseEnter(book)}
                onMouseLeave={handleMouseLeave}
              >
                <Card.Img
                  src={`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  alt={book.title}
                  style={{ objectFit: 'cover', height: '450px', width: '100%' }}
                />
                {hoveredBook === book && (
                  <Card.ImgOverlay className="card-overlay">
                    <Link to={`/book${book.key.replace('works/', '')}`} className="card-link">
                      <Card.Title className="title">{book.title}</Card.Title>
                    </Link>
                  </Card.ImgOverlay>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <p>No book here</p>
        )}
      </Row>
    </Container>
  );
};

export default BookFiction;
