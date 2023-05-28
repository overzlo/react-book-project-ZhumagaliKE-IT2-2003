import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ title, authors, coverUrl, bookKey }) => {
  return (
    <div>
      <Link to={`/book${bookKey.replace('works/', '')}`}>
        {coverUrl && <img src={coverUrl} alt={title} />}
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default Book;
