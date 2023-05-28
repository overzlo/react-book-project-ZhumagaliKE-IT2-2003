import React, { useState, useEffect } from 'react';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ListCrud = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/people/overzlo/lists.json');
      console.log('API response:', response.data);
      setLists(response.data.entries);
    } catch (error) {
      console.error('Error fetching lists:', error);
      setError('Error fetching lists.');
    }
  };

  const createList = async () => {
    try {
      const listData = {
        name: newListName,
        description: newListDescription,
      };

      const response = await axios.post('https://openlibrary.org/people/overzlo/lists', listData);
      console.log('Create list response:', response.data);
      setLists([...lists, response.data]);
      setNewListName('');
      setNewListDescription('');
    } catch (error) {
      console.error('Error creating list:', error);
      setError('Error creating list.');
    }
  };

  const deleteList = async (listId) => {
    try {
      await axios.post(`https://openlibrary.org/people/overzlo/list/${listId}/delete.json`);
      setLists(lists.filter((list) => list.url !== listId));
    } catch (error) {
      console.error('Error deleting list:', error);
      setError('Error deleting list.');
    }
  };

  return (
    <Container>
      <h1>List Page</h1>

      <h2>Create New List</h2>
      <Form>
        <Form.Group>
          <Form.Label>List Name</Form.Label>
          <Form.Control
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>List Description</Form.Label>
          <Form.Control
            type="text"
            value={newListDescription}
            onChange={(e) => setNewListDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={createList}>Create List</Button>
      </Form>

      <h2>Lists</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : lists.length === 0 ? (
        <p>No lists found.</p>
      ) : (
        <ListGroup>
          {lists.map((list) => (
            <ListGroup.Item key={list.url}>
              <h3>{list.name}</h3>
              <p>{list.description}</p>
              <Button variant="danger" onClick={() => deleteList(list.url)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ListCrud;


//НЕ РАБОТААААААААААЕТТТТТТТТТ