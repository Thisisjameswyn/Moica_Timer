import React, { Component } from "react";
import { IonButton, IonIcon, IonContent } from '@ionic/react';
import "../App.css";

class LapTimer extends Component
{
  state = {  //set intial state
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    lapTime: 0,
    splitTime: 0
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
  };

  resetTimer = () =>
  {
    this.setState({  //reset timer to 0
      timerStart: 0,
      timerTime: 0,
      lapTime: 0
    });
  };

  lapTimer = () =>
  {
    this.setState({
      splitTime: this.state.timerTime - this.state.splitTime,
      lapTime: this.state.splitTime
    });
  };

  render()
  {
    const { timerTime } = this.state;
    const { lapTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let lapMili = ("0" + (Math.floor(lapTime / 10) % 100)).slice(-2);
    let lapSeconds = ("0" + (Math.floor(lapTime / 1000) % 60)).slice(-2);
    let lapMinutes = ("0" + (Math.floor(lapTime / 60000) % 60)).slice(-2);
    let lapHours = ("0" + Math.floor(lapTime / 3600000)).slice(-2);
    return (
      <div className="LapTimer">
        {hours} : {minutes} : {seconds} : {centiseconds}
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <IonButton color="success" onClick={this.startTimer}>Start</IonButton>
        )}
        {this.state.timerOn === true && (
          <IonButton color="danger" onClick={this.stopTimer}>Stop</IonButton>
        )}
        {this.state.timerOn === true && (
          <IonButton color="warning" onClick={this.lapTimer}>Lap</IonButton>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <IonButton color="success" onClick={this.startTimer}>Resume</IonButton>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <IonButton color="warning" onClick={this.resetTimer}>Reset</IonButton>
        )}
        <br></br>
        {lapHours} : {lapMinutes} : {lapSeconds} : {lapMili}
      </div>
    );
  }
} export default LapTimer;