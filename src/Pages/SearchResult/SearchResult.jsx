import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Loading from '../../API/Loading/Loading';
import Error from '../../API/Error/Error';
import './SearchResult.css';
import { Link } from 'react-router-dom';

const SearchResult = () => {

  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setResults(data.docs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (event) => {
    event.target.src = '/images/error.jpg'; 
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <Container>
      <div className="mt-4 selector">
        <h1>Find your book...</h1>
        <input type="text"  className='sel' value={query} onChange={handleInputChange} />
        <button className="btn btn-dark" onClick={handleSearch}>
          Search
        </button>
      </div>

      <Row className="mt-4">
        {results.map((book) => (
          <Col key={book.key} sm={6} md={4} lg={3}>
            <Card className="mb-3 h-100 book-card ">
              <Link to={`/book${book.key.replace('works/', '')}`} className="card-link"> 
                {book.cover_i ? (
                  <Card.Img
                    variant="top"
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt="Book Cover"
                    onError={handleImageError}
                    className="card-img-top custom-img"
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src="/images/error.jpg"
                    alt="Default Cover"
                    className="card-img-top custom-img"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  {book.author_name && (
                    <Card.Text>
                      <strong>Author:</strong> {book.author_name.join(', ')}
                    </Card.Text>
                  )}
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResult;