import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
  render() {
    let className = '';
    const { label, oneDeleted, checkboxOneClick, active, createDate } = this.props;
    if (!active) {
      className = 'completed';
    }
    if (this.className === 'editing') {
      return (
        <li className={className}>
          <Task label={label} />
          <input type="text" className="edit" value="Editing task" />
        </li>
      );
    }
    const creatDateString = `created ${createDate()} ago`;
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={checkboxOneClick} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{creatDateString}</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Edit" />
          <button className="icon icon-destroy" onClick={oneDeleted} type="button" aria-label="Delete" />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  label: '',
  oneDeleted: () => {},
  checkboxOneClick: () => {},
  active: true,
  createDate: () => {},
};
Task.propTypes = {
  label: PropTypes.string,
  oneDeleted: PropTypes.func,
  checkboxOneClick: PropTypes.func,
  active: PropTypes.bool,
  createDate: PropTypes.func,
};
export default Task;
