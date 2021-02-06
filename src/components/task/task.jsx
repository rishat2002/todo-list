
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {RightCircleTwoTone,PauseCircleTwoTone} from '@ant-design/icons';

class Task extends Component {
  state = {
    timer:this.props.timerTime, //eslint-disable-line
    runTime:false
  }

  showTime = setInterval (()=> {
    this.setState({timer:this.props.timerTime}) //eslint-disable-line
  },1000)
  
  componentDidMount () {
  if (this.props.enableTimer) {   //eslint-disable-line
    this.setState({runTime:true})
  }
  }

  componentDidUpdate(prevProps, prevState){
  if (this.state.runTime!==prevState.runTime ) {   //eslint-disable-line
     this.props.timerFunc(this,this.props.id)      //eslint-disable-line
    }
  }

  componentWillUnmount () {
    clearInterval(this.showTime)
  }
  
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
    const{timer} = this.state
    const min = Math.floor(timer/60)
    const sec = timer-min*60 
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={checkboxOneClick} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
                  <RightCircleTwoTone className="play" onClick={() => {
                    this.setState({runTime:true})
                  }}/>
                  <PauseCircleTwoTone className="pause" onClick={() => { 
                    this.setState({runTime:false})
                    }}/>
                  {`${min}:${sec}`}
            </span>
            <span className="created">{creatDateString}</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Edit" />
          <button className="icon icon-destroy" onClick={()=>{
            this.setState({runTime:false})
            oneDeleted();
            }} type="button" aria-label="Delete" />
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
