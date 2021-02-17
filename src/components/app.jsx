/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import TaskList from './task-list/task-list';
import Footer from './footer';
import AddTask from './add-task';

const App = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('All');

  let taskList = [];
  const count = () => {
    return list.filter((item) => item.active).length;
  };

  const switchTimer = (id, enable, timerTime) => {
    const massIndex = list.findIndex((item) => item.id === id);
    const mass = [...list];
    if (mass[massIndex].enableTimer === false && enable === true) {
      mass[massIndex].timerDate = new Date();
      mass[massIndex].enableTimer = enable;
    }
    if (mass[massIndex].enableTimer === true && enable === false) {
      mass[massIndex].timerTime = timerTime;
      mass[massIndex].enableTimer = enable;
    }
    setList(mass);
  };

  const addTask = (label) => {
    const date = new Date();
    if (list.length === 0) {
      setList([
        {
          createDate: () => formatDistanceToNowStrict(date),
          label,
          id: 0,
          active: true,
          timerTime: 0,
          enableTimer: false,
          timerDate: date,
        },
      ]);
    } else {
    /* eslint-enable */
      const mass = [
        ...list,
        {
          label,
          id: list[list.length - 1].id + 1,
          active: true,
          createDate: () => formatDistanceToNowStrict(date, { includeSeconds: true }), //eslint-disable-line
          timerTime: 0,
          enableTimer: false,
          timerDate: date, //eslint-disable-line
        },
      ];
      setList(mass);
    }
  };

  const changeFilter = (filterType) => {
    setFilter(filterType);
  };

  const oneDeleted = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  /* eslint-disable no-param-reassign */

  const checkboxOneClick = (id) => {
    const newMass = list.map((item) => {
      if (item.id === id) {
        item.active = !item.active;
      }
      return item;
    });
    setList(newMass);
  };
  /* eslint-disable no-param-reassign */

  const clearCompletedTasks = () => {
    const newList = list.filter((item) => item.active);
    setList(newList);
  };
  if (filter === 'Active') {
    taskList = list.filter((item) => item.active);
  } else if (filter === 'Completed') {
    taskList = list.filter((item) => !item.active);
  } else {
    taskList = [...list];
  }
  return (
    <div>
      <h1>todos</h1>
      <AddTask add={addTask} />
      <section className="main">
        <TaskList
          oneDeleted={oneDeleted}
          list={taskList}
          checkboxOneClick={checkboxOneClick}
          switchTimer={switchTimer}
        />
      </section>
      <Footer
        count={count()}
        changeFilter={changeFilter}
        filterType={filter}
        clearCompletedTasks={clearCompletedTasks}
      />
    </div>
  );
};

export default App;
