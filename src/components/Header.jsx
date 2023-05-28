import React, { Component } from 'react';
import axios from 'axios';

import { Container, Nav, Navbar, Form, Dropdown, ButtonGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import BookDetailPage from '../Pages/BookDetailPage/BookDetailPage';
import SearchResult from '../Pages/SearchResult/SearchResult';
import Subjects from '../Pages/Subjects/Subjects';

import { createStore } from 'redux';
import reducer from '../Redux/reducer';
import Favorite from '../Pages/Favorite/Favorite';
import { Provider } from 'react-redux';
import GenreDropdown from './GenreDropdown/GenreDropdown';
import BookFiction from '../Pages/BookFiction/BookFiction';
import ListCrud from '../Pages/ListCrud/ListCrud';




const store = createStore(reducer);


export default class Header extends Component {

  render() {
    return (
      <>
      <Provider store={store}>
        <Router>
          <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Button variant="dark" as={Link} to="/">
                    Home
                  </Button>
                </Nav>
                <Nav className="me-auto">
                  <Button variant="dark" as={Link} to="/subjects">
                    Subjects
                  </Button>
                </Nav>
                <Nav className= "me-auto">
                <GenreDropdown/>
                </Nav>
                <Nav className="me-auto">
                  <Button variant="dark" as={Link} to="/favorites">
                    Favorites
                  </Button>
                </Nav>
                <Nav className="me-auto">
                  <Button variant="dark" as={Link} to="/search">
                    Search
                  </Button>
                </Nav>
        
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/books/:genre" element={<BookFiction />} />
            <Route path="/list" element={<ListCrud/>} />


          </Routes>
        </Router>
        </Provider>
      </>
    );
  }
}
