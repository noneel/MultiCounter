import React, { Component } from "react";
import Counter from "./Counter";
import '../index.css';

class Counters extends Component {
  render() {
    const {
      onDelete,
      counters,
    } = this.props;

    if(counters.length == 0) {
      return (
        <div className="mt-4 p-2 bg-gray-200 text-gray-400 w-full rounded-sm justify-center text-center flex items-center text-xl">
          <span>There are no current counters</span>
        </div>
      ) 
    }

    return (
      <div className="mt-4 p-2 bg-gray-200 w-full rounded-sm">
        {counters.map(counter => (
          <Counter
            key={counter.id}
            socket={this.props.socket}
            counter={counter}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
