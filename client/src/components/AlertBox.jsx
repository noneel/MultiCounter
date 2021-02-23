import React, { Component } from "react";

class AlertBox extends Component {

  static defaultProps = {
    title: "",
    message: "",
    show: false,
    autoClose: false,
    time: 5000,
    color: "red",
    placement: "top"
  };

  state = {
    show: this.props.show
  };

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.setState({
        show
      });
    }
  }

  render() {
    const { show } = this.state;
    return (
      show && (
        <div className="mb-2 w-full text-center">
            <div className={`inline-flex items-center bg-white leading-none text-${this.props.color}-600 rounded-full p-2 shadow text-sm`}>
                <span className={`inline-flex bg-${this.props.color}-600 text-white rounded-full h-6 px-3 justify-center items-center`}>{this.props.title}</span>
                <span className="inline-flex px-2">{this.props.message}</span>
            </div>
        </div>
      )
    );
  }
}

export default AlertBox;