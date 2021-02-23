import React, { Component } from "react";
import Counters from "./components/Counters";
import TimerHeader from "./components/TimerHeader";
import socketIOClient from "socket.io-client";
import './index.css';
const ENDPOINT = "http://127.0.0.1:8080";

class App extends Component {

  constructor() {
    super();

    var that = this;
    this.state.socket = socketIOClient(ENDPOINT);
    this.state.socket.on("TimerCreated", data => {
      console.log(data);
      var counters = this.state.counters;
      counters.push(data);
      this.setState({ counters });
    });

    this.state.socket.on("TimerDeleted", counterId => {
      console.log(`Server is Deleting: ${counterId}`);

      this.deleteTimer(counterId);
    });

    this.state.socket.on("TimerCompleted", counterId => {
      console.log(`Timer is Completed: ${counterId}`);

      if(!that.state.showCompleted) {
        this.deleteTimer(counterId);
      }
    });

    this.state.socket.on("currentCounters", counters => {
      this.setState({ counters });
    });
  }
  
  deleteTimer(counterId) {
    console.log(`Removing Timer: ${counterId}`);
    const counters = this.state.counters.filter(c => c.id !== counterId); 
    this.setState({ counters });
  }

  setShowCompleted = (bool) => {
    console.log(`Setting ShowCompleted: ${bool}`);
    this.setState({showCompleted: bool});
  }

  state = {
    counters: [
      // { id: 1, value: 0, title: "" }
    ],
    showCompleted: false
  };

  render() {
    return (
      <div>
        <header>
          <div className="w-full text-2xl text-center mt-2">
            <h1>MultiCounter</h1>
          </div>
        </header>
        
        <main className="container">
          <div className="w-full">
            <TimerHeader
              socket={this.state.socket}

              showCompleted={this.state.showCompleted}
              setShowCompleted={this.setShowCompleted}
            />
          </div>
          <Counters
            socket={this.state.socket}
            counters={this.state.counters}
            showCompleted={this.state.showCompleted}
          />
        </main>
      </div>
    );
  }
}

export default App;
