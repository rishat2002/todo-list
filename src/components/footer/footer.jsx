import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';

const Footer = ({ count, filterType, changeFilter, clearCompletedTasks }) => {
  const footerString = `${count} items left`;
  return (
    <footer className="footer">
      <span className="todo-count">{footerString}</span>
      <TasksFilter filterType={filterType} changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  count: 0,
  filterType: 'All',
  changeFilter: () => {},
  clearCompletedTasks: () => {},
};
Footer.propTypes = {
  count: PropTypes.number,
  filterType: PropTypes.string,
  changeFilter: PropTypes.func,
  clearCompletedTasks: PropTypes.func,
};
export default Footer;
