import React, { useState } from "react";

function ItemBook(book) {
  return (
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">{book.book.name}</h5>
        <p className="card-text">{book.book.genre}</p>
      </div>
    </div>
  );
}

export default ItemBook;
