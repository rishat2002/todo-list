/*eslint-disable*/
import React, { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import {RightCircleTwoTone,PauseCircleTwoTone} from '@ant-design/icons';

const Task = ({ label, oneDeleted, checkboxOneClick, active, 
  timerDate,timerTime,switchTimer,id ,createDate,enableTimer}) => {
  const [runTime,setRunTime] = useState(enableTimer)
  const [count,setCount] = useState(0)
    useEffect(()=>{
    const s = setInterval(()=>{
      setCount(prevCount=>prevCount+1)
     },1000)
     return () => {
      clearTimeout(s)
     }
    },[])
    const diffTime = Math.ceil((new Date().getTime()-timerDate.getTime())/1000+timerTime)
    useEffect(()=>{
    switchTimer(id,runTime,diffTime)
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
    const time = runTime?diffTime:timerTime
    const min = Math.floor(time/60)<10?`0${Math.floor(time/60)}`:Math.floor(time/60)
    const sec = (time-min*60)<10?`0${time-min*60}`: time-min*60 
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