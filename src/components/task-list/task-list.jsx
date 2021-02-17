/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

class TaskList extends Component {
  render() {
    const { list, oneDeleted, checkboxOneClick, switchTimer } = this.props;
    const reactList = list.map((item) => {
      const { active, label, id, createDate, timerTime, enableTimer, timerDate } = item;
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
          timerDate={timerDate}
          id={id}
          enableTimer={enableTimer}
          switchTimer={switchTimer}
          timerTime={timerTime}
        />
      );
    });
    return <ul className="todo-list">{reactList}</ul>;
  }
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
