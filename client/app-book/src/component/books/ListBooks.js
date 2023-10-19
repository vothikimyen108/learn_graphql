import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ItemBook from "./ItemBook";
import { getBooks } from "../../graphql-client/queries";

function ListBooks() {
  const { loading, error, data } = useQuery(getBooks);
  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <ul className="list-group">
      {data.books.length > 0 ? (
        data.books.map((item) => {
          return (
            <li className="list-group-item" key={item.id}>
              <ItemBook book={item}></ItemBook>
            </li>
          );
        })
      ) : (
        <li className="list-group-item">no data</li>
      )}
    </ul>
  );
}

export default ListBooks;
