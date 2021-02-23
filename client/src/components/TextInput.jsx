import React, { Component } from "react";

class TextInput extends Component {

  constructor(props) {
      super(props);
      this.state = { value: ""};
      this.onKeyUp = this.onKeyUp.bind(this);
  }

  onTextChange = e => {
      this.props.setValue(e.target.value);
  };

  onKeyUp(event) {
    // When ENTER is pressed
    if (event.charCode === 13) {
      this.props.onEnter();
    }
  }

  render() {
    return (
      <div className="mx-2 flex flex-col w-full">
          <label>{this.props.title} <span className="text-gray-400">(ex: {this.props.example})</span></label>
          <input onKeyPress={this.onKeyUp} onChange={e => this.onTextChange(e)} value={this.props.value} className="tw-input"/>
      </div>
    );
  }
}

export default TextInput;