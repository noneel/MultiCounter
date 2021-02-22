import React, { Component } from "react";

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = { value: ""};
    }

    onTextChange = e => {
        this.props.setValue(e.target.value);
    };

    render() {
      return (
        <div className="mx-2 flex flex-col w-full">
            <label>{this.props.title} <span className="text-gray-400">(ex: {this.props.example})</span></label>
            <input onChange={e => this.onTextChange(e)} value={this.state.titleValue} className="tw-input"/>
        </div>
      );
    }
}

export default TextInput;