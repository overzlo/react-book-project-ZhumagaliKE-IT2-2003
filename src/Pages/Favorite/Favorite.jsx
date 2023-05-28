import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Loading from '../../API/Loading/Loading';
import Error from '../../API/Error/Error';
import './Favorite.css'
const Favorite = () => {
  const favorites = useSelector((state) => state.favorites);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const bookPromises = favorites.map((bookId) => {
          const bookKey = `works/${bookId}`;
          return fetch(`https://openlibrary.org/${bookKey}.json`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error fetching book details');
              }
              return response.json();
            })
            .catch((error) => {
              console.error(error);
              return null;
            });
        });

        const favoriteBooksData = await Promise.all(bookPromises);
        setFavoriteBooks(favoriteBooksData.filter((book) => book !== null));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, [favorites]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <div className='selector'>
      <h1>Избранное</h1>
      </div>
      {favorites.length === 0 ? (
        <p>Ваш список избранных элементов пуст</p>
      ) : (
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
            {favoriteBooks.length === 0 ? (
              <p>Ошибка при загрузке данных о книгах</p>
            ) : (
              favoriteBooks.map((book) => (
                <Col key={book.key}>
                  <Card className="h-100 book-card">
                    {book.covers && book.covers.length > 0 && (
                      <Card.Img
                        variant="top"
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                        alt={book.title}
                      />
                    )}
                    <Card.Body>
                      <Link to={`/book${book.key.replace('works/', '')}`} className="card-link">
                        <Card.Title>{book.title}</Card.Title>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Favorite;
