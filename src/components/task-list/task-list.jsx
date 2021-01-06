/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

const TaskList = ({ list, oneDeleted, checkboxOneClick }) => {
  const reactList = list.map((item) => {
    const { active, label, id, createDate } = item;
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
      />
    );
  });
  return <ul className="todo-list">{reactList}</ul>;
};

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
