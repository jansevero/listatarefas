/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
  state = {
    tarefas: [],
    novaTarefa: '',
    index: -1
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

  handleChange = (e) => { //parametro passado quando a função é chamada
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const { novaTarefa, index, tarefas } = this.state;

    let novaTarefaTrim = novaTarefa.trim();

    if (novaTarefaTrim === '' || tarefas.includes(novaTarefaTrim)) return;

    if (index < 0) {
      this.setState((prevState) => ({
        tarefas: [...prevState.tarefas, novaTarefaTrim],
        novaTarefa: '',
      }));
    } else {
      this.setState((prevState) => ({
        tarefas: [
          ...prevState.tarefas.slice(0, index), //corta o array até o index (exlusivo)
          novaTarefaTrim,
          ...prevState.tarefas.slice(index + 1), //corta o array até o index (inclusivo)
        ],
        novaTarefa: '',
        index: -1,
      }));
    }
  };

  handleEdit = (index, tarefa) => {
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
        <Form {...{
          novaTarefa,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
        }}
        />
        <Tarefas
          {...{
            tarefas,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
          }}
        />
      </div>
    );
  }
}
