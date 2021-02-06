
import React, { Component } from 'react';
import {  formatDistanceToNowStrict } from 'date-fns';
import TaskList from './task-list';
import Footer from './footer';
import AddTask from './add-task';

class App extends Component {
  state = {
    list: [],
    filter: 'All',
  };

  taskList = [];
  
  count = () => {
    const { list } = this.state;
    return [...list].filter((item) => item.active).length;
  }

  addTask = (label) => {
    this.setState(({ list }) => {
      const date = new Date();
      /* eslint-disable */
      const timerFunc = (task,id) => {
      const massIndex = this.state.list.findIndex(item => item.id===id)
      if (task.state.runTime && !this.state.list[massIndex].enableTimer) {
      const tick = setInterval(() => {
          let item = this.state.list[massIndex]
          if (typeof item == 'undefined') {
            item = {enableTimer:false}
          }
          if(!item.enableTimer){
            clearInterval(tick)
            }
          else {
          this.setState(({list})=>{
            const mass = [...list]
            mass[massIndex].timerTime++
            return mass
          })
          }},1000);
      }
      this.setState(({list})=>{
        const mass = [...list]
        mass[massIndex].enableTimer = task.state.runTime
        return mass
      })
    }
    
      if (list.length === 0) {
        return {
          list: [{ createDate: () => formatDistanceToNowStrict(date), label, id: 0, active: true,timerTime : 0, timerFunc:timerFunc,enableTimer:false}],
        };
      }
      /* eslint-enable */
      const mass = [
        ...list,
        {
          label,
          id: list[list.length - 1].id + 1,
          active: true,
          createDate: () => formatDistanceToNowStrict(date, { includeSeconds: true }), //eslint-disable-line
          timerTime : 0, timerFunc:timerFunc                                     //eslint-disable-line
        },
      ];
      return { list: mass };
    });
  };

  changeFilter = (filterType) => {
    this.setState({ filter: filterType });
  };

  oneDeleted = (id) => {
    this.setState(({ list }) => { //eslint-disable-line
      return { list: list.filter((item)=> item.id!==id) };
    });
  };

  /* eslint-disable no-param-reassign */

  checkboxOneClick = (id) => {
    this.setState(({ list }) => {
      const newMass = list.map((item) => {
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
      const newList = list.filter((item) => item.active);
      return { list: newList };
    });
  };

  render() {
    const { list, filter} = this.state;
    if (filter === 'Active') {
      this.taskList = list.filter((item) => item.active);
    } else if (filter === 'Completed') {
      this.taskList = list.filter((item) => !item.active);
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
          count={this.count()}
          changeFilter={this.changeFilter}
          filterType={filter}
          clearCompletedTasks={this.clearCompletedTasks}
        />
      </div>
    );
  }
}

export default App;
