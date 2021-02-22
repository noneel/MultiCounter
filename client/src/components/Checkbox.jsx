import React, { Component } from "react";

class Checkbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isChecked: props.isChecked
        }
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        }, function() {
            console.log(this.state);
            this.props.parentCallback(this.state.isChecked);
        }.bind(this));
    }

    render() {
      return (
        <div>
            <label>{this.props.title}</label>
            <div className="ml-2 relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" defaultChecked={this.state.isChecked} onChange={this.toggleChange} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"></label>
            </div>
        </div>
      );
    }
}

export default Checkbox;