/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

// Form
import { FaPlus } from 'react-icons/fa';

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  state = {
    tarefas: [],
    novaTarefa: '',
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (tarefas) {
      this.setState({
        tarefas,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { novaTarefa, index } = this.state;

    if (novaTarefa.trim() === '') {
      return;
    }

    if (index < 0) {
      this.setState((prevState) => ({
      tarefas: [...prevState.tarefas, novaTarefa],
      novaTarefa: '',
      }));
    } else {
      this.setState((prevState) => ({
        tarefas: [
          ...prevState.tarefas.slice(0, index),
          novaTarefa,
          ...prevState.tarefas.slice(index + 1),
        ],
        novaTarefa: '',
        index: -1,
      }));
    }
  };

  handleEdit = (tarefa, index) => {
    this.setState({
      novaTarefa: tarefa,
      index,
    });
  };

  handleDelete = (tarefa) => {
    this.setState((prevState) => ({
      tarefas: prevState.tarefas.filter((t) => t !== tarefa),
    }));
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>
          Lista de tarefas
        </h1>

        <form action="#" className="form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit className="edit" onClick={() => this.handleEdit(tarefa, index)} />
                <FaWindowClose className="delete" onClick={() => this.handleDelete(tarefa)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
