import React, { Component } from "react";
import Checkbox from "./Checkbox"
import TextInput from "./TextInput"
import AlertBox from "./AlertBox"
import '../index.css';

class TimerHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      timerValue: "", 
      titleValue: "",
      hasError: false,
      showSuccess: false,
    };

    var that = this;
    this.props.socket.on("ValidTimer", isValid => {
      if(!isValid) {
        console.log("Server -> Invalid Timer");
        that.setState({ hasError: true });

        setTimeout(function() {
          that.setState({hasError: false}); 
        }, 5000);
      } else {
        that.setState({ showSuccess: true });
        setTimeout(function() {
          that.setState({showSuccess: false}); 
        }, 3000);
      }
    });
  }

  newTimer = () => {
    this.props.socket.emit("reqNewTimer", {
      title: this.state.titleValue, 
      value: this.state.timerValue
    });
    this.setState({titleValue: "", timerValue: ""});
  }

  setValue = (text) => {
    this.setState({timerValue: text, hasError: false});
  }

  setTitle = (text) => {
    this.setState({titleValue: text});
  }

  onEnter = () => {
    console.log("ENTER Pressed: Submitting...");
    this.newTimer();
  }

  render() {
    var d = new Date();
    d.setMinutes(d.getMinutes() + 10);
    return (
      <div className="bg-gray-300 p-4 rounded-sm">
        <AlertBox
          title="Invalid Timer!"
          message={`"${this.state.timerValue}" is an invalid date.`}
          show={this.state.hasError}
        />
        <AlertBox
          title="Success!"
          message={`Added new timer for "${this.state.timerValue}"`}
          show={this.state.showSuccess}
          color="blue"
        />
        <div className="flex flex-row justify-center">
          <TextInput title="Title" example="NETW 2 - Firewall Policy" setValue={this.setTitle} onEnter={this.onEnter} value={this.state.titleValue}/>
          <TextInput title="Time Value" example={d.toUTCString()} setValue={this.setValue} onEnter={this.onEnter} value={this.state.timerValue}/>

          <div className="flex items-end">
            <button className="blue-button w-10 h-10 text-2xl text-white"
              onClick={() => this.newTimer()} >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex flex-row w-full mr-auto mt-2">
          <Checkbox 
            title="Show Completed"
            isChecked={this.props.showCompleted}
            parentCallback={this.props.setShowCompleted}
          />
        </div>
      </div>
    );
  }
}

export default TimerHeader;
