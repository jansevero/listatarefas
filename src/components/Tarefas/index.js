import React from 'react';

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={index}>
          {tarefa}
          <div>
            <FaEdit className="edit" onClick={() => handleEdit(index, tarefa)} />
            <FaWindowClose className="delete" onClick={() => handleDelete(tarefa)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
