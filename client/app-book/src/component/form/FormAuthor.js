import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { addSingleAuthor} from "../../graphql-client/mutations";
import { getAuthors, getBooks } from "../../graphql-client/queries";
const FormAuthor = () => {
  const [addAuthor, { data, loading, error }] = useMutation(addSingleAuthor, {
    refetchQueries: [{ query: getAuthors }],
  });

  const [formData, setFormData] = useState({
    name: "",
    age: "",
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
      const response = await addAuthor({
        variables: {
          name: formData.name,
          age: parseInt(formData),
        },
      });
      setFormData({
        name: "",
        age: "",
      });
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center text-info ">Create Author</h3>
      <div className="form-group mb-2">
        <label htmlFor="exampleFormControlInput1 mb-3">Name author</label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          name="name"
          placeholder="Jena"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleFormControlInput2">Age</label>
        <input
          className="form-control"
          id="exampleFormControlInput2"
          name="age"
          placeholder="comedy"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Create a author
      </button>
    </form>
  );
};

export default  FormAuthor;
