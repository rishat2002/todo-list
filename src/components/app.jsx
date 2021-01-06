import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import TaskList from './task-list';
import Footer from './footer';
import AddTask from './add-task';

class App extends Component {
  state = {
    list: [],
    count: () => {
      const { list } = this.state;
      return [...list].filter((item) => item.active).length;
    },
    filter: 'All',
  };

  taskList = [];

  addTask = (label) => {
    this.setState(({ list }) => {
      const date = new Date();
      if (list.length === 0) {
        return {
          list: [{ createDate: () => formatDistanceToNow(date, { includeSeconds: true }), label, id: 0, active: true }],
        };
      }
      const mass = [
        ...list,
        {
          label,
          id: list[list.length - 1].id + 1,
          active: true,
          createDate: () => formatDistanceToNow(date, { includeSeconds: true }),
        },
      ];
      return { list: mass };
    });
  };

  changeFilter = (filterType) => {
    this.setState({ filter: filterType });
  };

  oneDeleted = (id) => {
    this.setState(({ list }) => {
      const index = list.findIndex((item) => item.id === id);
      return { list: [...list.slice(0, index), ...list.slice(index + 1, list.length)] };
    });
  };

  /* eslint-disable no-param-reassign */
  checkboxOneClick = (id) => {
    this.setState(({ list }) => {
      const newMass = [...list].map((item) => {
        if (item.id === id) {
          item.active = !item.active;
        }
        return item;
      });
      return newMass;
    });
  };
  /* eslint-disable no-param-reassign */

  clearCompletedTasks = () => {
    this.setState(({ list }) => {
      const newList = [...list].filter((item) => item.active);
      return { list: newList };
    });
  };

  render() {
    const { list, filter, count } = this.state;
    if (filter === 'Active') {
      this.taskList = [...list].filter((item) => item.active);
    } else if (filter === 'Completed') {
      this.taskList = [...list].filter((item) => !item.active);
    } else {
      this.taskList = [...list];
    }
    return (
      <div>
        <h1>todos</h1>
        <AddTask add={this.addTask} />
        <section className="main">
          <TaskList oneDeleted={this.oneDeleted} list={this.taskList} checkboxOneClick={this.checkboxOneClick} />
        </section>
        <Footer
          count={count()}
          changeFilter={this.changeFilter}
          filterType={filter}
          clearCompletedTasks={this.clearCompletedTasks}
        />
      </div>
    );
  }
}

export default App;
