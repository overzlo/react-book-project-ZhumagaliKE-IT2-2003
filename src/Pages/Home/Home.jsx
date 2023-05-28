import React, { useEffect, useState, Component, useContext  } from 'react';
import BookList from '../../components/BookList/BookList';
import axios from 'axios';
import Error from '../../API/Error/Error';
import Loading from '../../API/Loading/Loading';
import BigSlider from '../../components/BigSlider/BigSlider';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../API/context';
import '../../components/BookList/BookList.css';
// class HomePage extends Component {
//   state = {
//     popularBooks: [],
//     newBooks: [],
//     loveBooks: [],
//     trendingBooks: [],
//     animalBooks: [],
//     error: null,
//   };

//   componentDidMount() {
//     this.fetchPopularBooks();
//     this.fetchNewBooks();
//     this.fetchLoveBooks();
//     this.fetchTrendingBooks();
//     this.fetchAnimalBooks();
//   }

//   componentDidCatch(error, errorInfo) {
//     this.setState({ error: 'An error occurred' });
//     console.log(error, errorInfo);
//   }

//   fetchPopularBooks = async () => {
//     try {
//       const response = await axios.get('https://openlibrary.org/subjects/fiction.json?limit=50');
//       this.setState({ popularBooks: response.data.works });
//     } catch (error) {
//       this.setState({ error: 'Error fetching popular books' });
//     }
//   };

//   fetchNewBooks = async () => {
//     try {
//       const response = await axios.get('https://openlibrary.org/subjects/history.json?limit=50');
//       this.setState({ newBooks: response.data.works });
//     } catch (error) {
//       this.setState({ error: 'Error fetching new books' });
//     }
//   };

//   fetchLoveBooks = async () => {
//     try {
//       const response = await axios.get('https://openlibrary.org/subjects/love.json?limit=50');
//       this.setState({ loveBooks: response.data.works });
//     } catch (error) {
//       this.setState({ error: 'Error fetching love books' });
//     }
//   };

//   fetchTrendingBooks = async () => {
//     try {
//       const response = await axios.get('https://openlibrary.org/trending/daily.json');
//       this.setState({ trendingBooks: response.data.works });
//     } catch (error) {
//       this.setState({ error: 'Error fetching trending books' });
//     }
//   };

//   fetchAnimalBooks = async () => {
//     try {
//       const response = await axios.get('https://openlibrary.org/subjects/animals.json?limit=50');
//       this.setState({ animalBooks: response.data.works });
//     } catch (error) {
//       this.setState({ error: 'Error fetching animal books' });
//     }
//   };

//   render() {
//     const { popularBooks, newBooks, loveBooks, trendingBooks, animalBooks, error } = this.state;

//     if (error) {
//       return <Error message={error} />;
//     }

//     if (!popularBooks || !newBooks || !loveBooks || !trendingBooks || !animalBooks) {
//       return <Loading />;
//     }

//     return (
//       <Container>
//         <div>
//           <h2>Trending</h2>
//           <BookList books={trendingBooks} />

//           <h2>Love</h2>
//           <BookList books={loveBooks} />

//           <h2>Fiction</h2>
//           <BookList books={popularBooks} />

//           <h2>History</h2>
//           <BookList books={newBooks} />

//           <h2>Animals</h2>
//           <BookList books={animalBooks} />
//         </div>
//       </Container>
//     );
//   }
// }

// export default HomePage;



const HomePage = () => {
  const { popularBooks, newBooks, loveBooks, trendingBooks, animalBooks, error } = useContext(AppContext);

  if (error) {
    return <Error message={error} />;
  }

  if (!popularBooks || !newBooks || !loveBooks || !trendingBooks || !animalBooks) {
    return <Loading />;
  }

  return (
    <>
            <img src= '/images/banner.png'  alt="asd"  className='center'/>

    <Container>
     

      <div className='banner'>
      <h1>Trending Books</h1>
      <BookList books={trendingBooks}/>
      </div>
      
      <div className='banner'>

      <h1>Fiction</h1>

      <BookList books={popularBooks}/>
      </div>  

      <div className='banner'>

      <h1>History books</h1>

      <BookList books={newBooks}/>
      </div>
      <div className='banner'>

      <h1>Love Story</h1>

      <BookList books={loveBooks}/>
      </div>
      <div className='banner'>

      <h1>In the animal world</h1>

      <BookList books={animalBooks}/>
      </div>

      </Container>  
      </>
);
};

export default HomePage;