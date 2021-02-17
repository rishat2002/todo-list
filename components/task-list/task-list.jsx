/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

class TaskList extends Component  {
state = {
  
}
render () {
  const { list, oneDeleted, checkboxOneClick } = this.props
  const reactList = list.map((item) => {
  const { active, label, id, createDate,  timerFunc,enableTimer,timerTime} = item;
    return (
      <Task
        label={label}
        oneDeleted={() => {
          oneDeleted(id);
        }}
        checkboxOneClick={() => {
          checkboxOneClick(id);
        }}
        key={id}
        active={active}
        createDate={createDate}
        timerTime = {item.timerTime}
        timerFunc = {timerFunc}
        id={id}
        enableTimer={enableTimer}
      />
    );
  });
  return <ul className="todo-list">{reactList}</ul>;
};
}

TaskList.defaultProps = {
  list: [],
  oneDeleted: () => {},
  checkboxOneClick: () => {},
};
TaskList.propTypes = {
  oneDeleted: PropTypes.func,
  checkboxOneClick: PropTypes.func,
};
export default TaskList;
