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
      hasError: false
    };

    var that = this;
    this.props.socket.on("ValidTimer", isValid => {
      if(!isValid) {
        console.log("Server -> Invalid Timer");
        that.setState({ hasError: true });
      }
    });
  }

  newTimer = () => {
    this.props.socket.emit("reqNewTimer", {
      title: this.state.titleValue, 
      value: this.state.timerValue
    });
  }

  setValue = (text) => {
    this.setState({timerValue: text, hasError: false});
  }

  setTitle = (text) => {
    this.setState({titleValue: text});
  }

  render() {
    const {
      socket,
    } = this.props;
    return (
      <div className="bg-gray-300 p-4 rounded-sm">
        <AlertBox
          title="Invalid Timer!"
          message={`"${this.state.timerValue}" is an invalid date.`}
          show={this.state.hasError}
        />
        <div className="flex flex-row justify-center">
          <TextInput title="Title" example="NETW 2 - Firewall Policy" setValue={this.setTitle}/>
          <TextInput title="Time Value" example="Sat, 30 Jan 2021 18:45:24 +0000" setValue={this.setValue}/>

          <div className="flex items-center">
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
