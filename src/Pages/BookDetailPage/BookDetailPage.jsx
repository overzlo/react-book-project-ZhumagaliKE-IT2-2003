import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BookDetailPage.css';
import Error from '../../API/Error/Error';
import Loading from '../../API/Loading/Loading';
import { addToFavorites, removeFromFavorites } from '../../Redux/actions';
import { Button } from 'react-bootstrap';

const BookDetailPage = () => {
  const { id } = useParams();
  const bookKey = `works/${id}`;

  const [bookDetails, setBookDetails] = useState(null);
  const [author, setAuthor] = useState(null);
  const [coverUrls, setCoverUrls] = useState([]);
  const [error, setError] = useState(null);

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/${bookKey}.json`);
        if (!response.ok) {
          throw new Error('Error fetching book details');
        }
        const data = await response.json();
        setBookDetails(data);

        if (data.authors && data.authors.length > 0) {
          const authorKey = data.authors[0].author.key.replace('/authors/', '');
          const authorResponse = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
          if (!authorResponse.ok) {
            throw new Error('Error fetching author details');
          }
          const authorData = await authorResponse.json();
          setAuthor(authorData);
        }

        const coverIds = data.covers && data.covers.length > 0 ? data.covers : [];
        const coverUrls = coverIds.map((coverId) => `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
        setCoverUrls(coverUrls);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookDetails();
  }, [bookKey]);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(id));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(id));
  };

  if (error) {
    return <Error message={error} />;
  }

  if (!bookDetails) {
    return <Loading />;
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="info">
        <div className="details">
          <h1 className="title "><b>{bookDetails.title}</b></h1>
          
          <div className='info-detail'><b>Author</b>:  {author ? author.name : 'N/A'}</div>
          <div className='info-detail'><b>First Publish Date</b>: {bookDetails.first_publish_date}</div>

           
          <p className='info-detail'><b>Description: </b>{bookDetails.description || 'N/A'}</p> 
          <p className='info-detail'><b>Subjects</b>: {bookDetails.subjects ? bookDetails.subjects.join(', ') : 'N/A'}</p>
          <p className='info-detail'><b>Subject People</b>: {bookDetails.subject_people ? bookDetails.subject_people.join(', ') : 'N/A'}</p>
          <p className='info-detail'><b>Excerpts</b>: {bookDetails.excerpts ? bookDetails.excerpts.map((excerpt) => excerpt.excerpt).join(', ') : 'N/A'}</p>
          {bookDetails.links && (
            <div>
              <p className='info-detail'><b>Links</b>:</p>
              <ul>
                {bookDetails.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="slider">
          {coverUrls.length > 0 && (
            <Slider {...sliderSettings}>
              {coverUrls.map((coverUrl, index) => (
                <div key={index}>
                  <img src={coverUrl} alt={bookDetails.title}  style={{objectFit: 'cover', width:'100%'}} />
                </div>
              ))}
            </Slider>
          )}
          <div className="favorites-button">
            {favorites.includes(id) ? (
              <Button onClick={handleRemoveFromFavorites} variant="outline-danger">Remove from Favorites</Button>
            ) : (
              <Button onClick={handleAddToFavorites} variant="outline-danger">Add to Favorites</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
