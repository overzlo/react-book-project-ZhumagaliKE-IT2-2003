import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col className="text-center py-1 text-black">
              &copy; All Rights Reserved. Zhumagali Kanat BookProject based on Openlibrary API.
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
