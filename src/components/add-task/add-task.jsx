import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTask extends Component {
  state = {
    label: '',
  };

  labelChange = (evt) => {
    const inputString = evt.target.value;
    this.setState({ label: inputString });
  };

  render() {
    const { label } = this.state;
    const { add } = this.props;
    return (
      <header className="header">
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.labelChange} value={label} />
        <button
          type="button"
          className="selected add"
          onClick={() => {
            if (label !== '') {
              add(label);
            }
            this.setState({ label: '' });
          }}
        >
          Add
        </button>
      </header>
    );
  }
}

AddTask.defaultProps = {
  add: () => {},
};
AddTask.propTypes = {
  add: PropTypes.func,
};
export default AddTask;
