import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loveBooks, setLoveBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [animalBooks, setAnimalBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);





  useEffect(() => {
    fetchPopularBooks();
    fetchNewBooks();
    fetchLoveBooks();
    fetchTrendingBooks();
    fetchAnimalBooks();

  }, []);

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/fiction.json?limit=50');
      setPopularBooks(response.data.works);
    } catch (error) {
      setError('Error fetching popular books');
    }
  };

  const fetchNewBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/history.json?limit=50');
      setNewBooks(response.data.works);
    } catch (error) {
      setError('Error fetching new books');
    }
  };

  const fetchLoveBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/love.json?limit=50');
      setLoveBooks(response.data.works);
    } catch (error) {
      setError('Error fetching love books');
    }
  };

  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/trending/daily.json');
      setTrendingBooks(response.data.works);
    } catch (error) {
      setError('Error fetching trending books');
    }
  };

  const fetchAnimalBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/animals.json?limit=50');
      setAnimalBooks(response.data.works);
    } catch (error) {
      setError('Error fetching animal books');
    }
  };

  


  const contextValue = {
    popularBooks,
    newBooks,
    loveBooks,
    trendingBooks,
    animalBooks,
    searchResults,
    loading,
    error  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
