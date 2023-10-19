import Container from 'react-bootstrap/Container' 
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import React, { useState } from 'react'
import ListBooks from './component/books/ListBooks';
import Form from './component/form/Form';
import FormAuthor from './component/form/FormAuthor';


function App() {
  return (

    <Container className='py-3 mt-3'>
    <div className="row">
      <div className="col-md-6">
        <h2>List of Books</h2>
        <ListBooks />
      </div>
      <div className="col-md-6">
        <h2>Add a Book or Author</h2>
        <Form />
        <FormAuthor />
      </div>
    </div>
  </Container>

  );
}

export default App;
