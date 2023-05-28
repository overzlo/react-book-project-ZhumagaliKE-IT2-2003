import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const GenreDropdown = () => {
  const genres = [
    { name: 'Fantasy', slug: 'fantasy' },
    { name: 'Historical Fiction', slug: 'historical_fiction' },
    { name: 'Horror', slug: 'horror' },
    { name: 'Humor', slug: 'humor' },
    { name: 'Literature', slug: 'literature' },
    { name: 'Magic', slug: 'magic' },
    { name: 'Mystery and detective stories', slug: 'mystery_and_detective_stories' },
    { name: 'Plays', slug: 'plays' },
    { name: 'Poetry', slug: 'poetry' },
    { name: 'Romance', slug: 'romance' },
    { name: 'Science Fiction', slug: 'science_fiction' },
    { name: 'Short Stories', slug: 'short_stories' },
    { name: 'Thriller', slug: 'thriller' },
    { name: 'Young Adult', slug: 'young_adult' },
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="genre-dropdown">
        Fiction
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {genres.map((genre) => (
          <Dropdown.Item key={genre.slug} as={Link} to={`/books/${genre.slug}`}>
            {genre.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenreDropdown;
