import React, { Component } from "react";
import '../index.css';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: -1
    };
    
    var that = this;
    var interval = setInterval(function() {

      const currentDate = new Date().valueOf();

      if(props.counter.value <= currentDate) {
        console.log(`Counter Completed! ${props.counter.id}`);
        clearInterval(interval);
      } else {
        const time = props.counter.value - currentDate;
        that.setState({ timeRemaining: time });
      }
    }, 100);
  }

  handleDelete = counterId => {
    console.log(`Deleting: ${counterId}`);
    this.props.socket.emit("reqDeleteTimer", counterId);
  };

  render() {
    return (
      <div>
        <div className="px-4 mt-2 flex flex-row w-full items-center bg-gray-200 shadow-lg rounded-lg">
            <div className="flex flex-col mr-auto">
              <span className={this.getBadgeClasses()}>
                <span className="text-lg px-2">
                  {this.props.counter.title}
                </span>
              </span>
              <span className="text-sm text-center pb-2">
                {this.formatCount()}
              </span>
            </div>
            <div className="text-center">
              <span className="text-6xl">
                {this.formatTimeRemaining()}
              </span>
            </div>
            <div className="flex ml-auto">
              <button
                className="red-button w-10 h-10 text-2xl text-white"
                onClick={() => this.handleDelete(this.props.counter.id)}
              >
                <i className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
        </div>
      </div>
    );
  }

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = () => {
    const { value } = this.props.counter;
    const d = new Date(value);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  formatTimeRemaining = () => {
    const d = new Date(this.state.timeRemaining);
    return (d.getUTCHours() < 10 ? "0" : "") + d.getUTCHours() + ":" + (d.getUTCMinutes() < 10 ? "0" : "") + d.getUTCMinutes() + ":" + (d.getUTCSeconds() < 10 ? "0" : "") + d.getUTCSeconds();
  }
}

export default Counter;
