import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default function Form({ novaTarefa, handleChange, handleSubmit }) {
  return (
    <form action="#" className="form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        value={novaTarefa}
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}
