import React, { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import {RightCircleTwoTone,PauseCircleTwoTone} from '@ant-design/icons';
/* eslint-disable */

const Task = ({ label, oneDeleted, checkboxOneClick, active, 
    createDate,timerTime,timerFunc,enableTimer,id }) => {
  
  const [time,setTime] = useState(timerTime)
  const [runTime,setRunTime] = useState(enableTimer)
  useEffect(()=>{
  console.log(enableTimer)
  if (enableTimer) {   //eslint-disable-line
    setRunTime(true)
  }
  },[])
  useEffect(()=>{
          setTime(timerTime)
  })
  useEffect(()=>{
    timerFunc(runTime,id)      //eslint-disable-line
  },[runTime])

    let className = '';
    if (!active) {
      className = 'completed';
    }
    if (className === 'editing') {
      return (
        <li className={className}>
          <Task label={label} />
          <input type="text" className="edit" value="Editing task" />
        </li>
      );
    }
    const creatDateString = `created ${createDate()} ago`;
    const min = Math.floor(time/60)
    const sec = time-min*60 
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={checkboxOneClick} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
                  <RightCircleTwoTone className="play" onClick={() => {
                    setRunTime(true)
                  }}/>
                  <PauseCircleTwoTone className="pause" onClick={() => { 
                    setRunTime(false)
                    }}/>
                  {`${min}:${sec}`}
            </span>
            <span className="created">{creatDateString}</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Edit" />
          <button className="icon icon-destroy" onClick={()=>{
            setRunTime(false)
            oneDeleted();
            }} type="button" aria-label="Delete" />
        </div>
      </li>
    );
}

Task.defaultProps = {
  label: '',
  oneDeleted: () => {},
  checkboxOneClick: () => {},
  active: true,
  createDate: () => {},
  timerTime: 0,
  timerFunc:()=>{}
};
Task.propTypes = {
  label: PropTypes.string,
  oneDeleted: PropTypes.func,
  checkboxOneClick: PropTypes.func,
  active: PropTypes.bool,
  createDate: PropTypes.func,
  timerTime:PropTypes.number,
  timerFunc:PropTypes.func
};
export default Task;