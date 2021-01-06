import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ filterType, changeFilter }) => {
  let classNameAll = '';
  let classNameActive = '';
  let classNameCompleted = '';
  if (filterType === 'All') classNameAll = 'selected';
  else if (filterType === 'Active') classNameActive = 'selected';
  else if (filterType === 'Completed') classNameCompleted = 'selected';
  return (
    <ul className="filters">
      <li>
        <button
          className={classNameAll}
          onClick={() => {
            changeFilter('All');
          }}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={classNameActive}
          onClick={() => {
            changeFilter('Active');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={classNameCompleted}
          onClick={() => {
            changeFilter('Completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  filterType: 'All',
  changeFilter: () => {},
};
TasksFilter.propTypes = {
  filterType: PropTypes.string,
  changeFilter: PropTypes.func,
};
export default TasksFilter;
