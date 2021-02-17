import React,{useState}from 'react';
import PropTypes from 'prop-types';

const AddTask = ({add}) => {
  const [label,setLabel] = useState('')
  const labelChange = (evt) => {
    const inputString = evt.target.value;
    setLabel(inputString)
    };
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        add(label);
      }
    };
    return (
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={labelChange}
          value={label}
          onKeyPress={handleKeyPress}
        />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
      </header>
    );
}

AddTask.defaultProps = {
  add: () => {},
};
AddTask.propTypes = {
  add: PropTypes.func,
};
export default AddTask;
