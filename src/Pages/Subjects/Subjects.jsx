import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Subjects.css'

import Loading from '../../API/Loading/Loading';
import Error from '../../API/Error/Error';

const Subjects = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const subjects = ['Arts', 'Animals', 'Fiction', 'Science & Mathematics', 'Business & Finance', 'Juvenile Fiction', 'History', 'Biography', 'Social Sciences', 'Places', 'Textbooks'];

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);

    if (selectedSubject) {
      setLoading(true); 
      setError(null); 

      axios.get(`https://openlibrary.org/subjects/${selectedSubject.toLowerCase().replace(/ /g, '_')}.json?limit=500`)
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
    } else {
      setBooks([]);
    }
  };

  return (
    <Container>
    <div className='selector'>
      <h1>Subjects</h1> 
      <select value={selectedSubject} onChange={handleSubjectChange} className='selec'>
        <option value="" >Choose subjects</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {selectedSubject && (
        <div>
          <h2>Books by subjects: {selectedSubject}</h2>
          {loading ? (
            <Loading /> 
          ) : error ? (
            <Error message={error} /> 
          ) : (
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                {books.length > 0 ? (
                  books.map((book) => (
                    <Col key={book.key}>
                      <Card className="book-card h-100">
                        {book.cover_id && (
                          <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                            <img
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                              alt={book.title}    
                            />
                          </div>
                        )}
                        <Card.Body>
                          <Link to={`/book${book.key.replace('works/', '')}`}> 
                            <Card.Title>{book.title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No books here</p>
                )}
              </Row>
          )}
        </div>
      )}
    </div>
    </Container>
  );
};

export default Subjects;
