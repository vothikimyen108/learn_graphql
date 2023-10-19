import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { addSingleBook } from '../../graphql-client/mutations';
import { getAuthors, getBooks } from "../../graphql-client/queries";
const Form = () => {
    const [addBook, { data, loading, error }] = useMutation( addSingleBook, {
        refetchQueries: [{ query: getBooks }],
      });
    const { data: dataAuth, loading: loadingAuth, error: errorAuth } = useQuery(getAuthors);
  console.log(dataAuth)
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addBook({
        variables: {
          name: formData.name,
          genre: formData.genre,
          authorId: formData.authorId,
        },
      });
      console.log(response.data); // Log the response from the mutation
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <form onSubmit={handleSubmit}>
        <h3 className='text-center text-info '>Create book</h3>
      <div className="form-group mb-2">
        <label htmlFor="exampleFormControlInput1 mb-3">Book Name</label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          name="name"
          placeholder="abc"
          value={formData.bookName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleFormControlInput2">Book Genre</label>
        <input
          className="form-control"
          id="exampleFormControlInput2"
          name="genre"
          placeholder="comedy"
          value={formData.bookGenre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleFormControlSelect1">Tác giả</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          name="authorId"
          value={formData.authorId}
          onChange={handleInputChange}
          required
        >
          {dataAuth?.authors.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Create a Book</button>
    </form>
  );
};

export default Form;
