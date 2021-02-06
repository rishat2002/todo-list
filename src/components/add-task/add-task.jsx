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
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        add(label)
      }
    }
    return (
      <header className="header">
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.labelChange} value={label} onKeyPress={handleKeyPress}/>
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
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
