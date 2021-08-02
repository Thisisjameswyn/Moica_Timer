import React, { Component } from "react";
import "./App.css"; class LapTimer extends Component
{
  state = {  //set intial state
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () =>
  {
    this.setState({  //on start set new state
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime //keep time based on current minus time from start
    });
    this.timer = setInterval(() =>  
    {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10); //set state timerTime every 10 ms
  };

  stopTimer = () =>
  {
    this.setState({ timerOn: false });  //set state timer off
    clearInterval(this.timer); //clear setting interval
  }; resetTimer = () =>
  {
    this.setState({  //reset timer to 0
      timerStart: 0,
      timerTime: 0
    });
  };

  render()
  {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="LapTimer">
        {hours} : {minutes} : {seconds} : {centiseconds}
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={this.startTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.startTimer}>Resume</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.resetTimer}>Reset</button>
        )}
      </div>
    );
  }
} export default LapTimer;