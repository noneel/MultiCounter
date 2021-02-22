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

  startTimer = () => {
    const { autoClose, time, show, onClose } = this.props;
    if (autoClose && show) {
      this.timer = setTimeout(() => {
        this.setState({
          show: false
        });

        onClose && onClose(false);
      }, time);
    }
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.setState({
        show
      });

      if (show) {
        this.startTimer();
      } else {
        clearTimeout(this.timer);
      }
    }
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({
      show: false
    });
    onClose && onClose(false);
    clearTimeout(this.timer);
  };

  render() {
    const { message, variant, placement } = this.props;
    const { show } = this.state;
    return (
      show && (
        <div className="mb-2 w-full text-center">
            <div className={`inline-flex items-center bg-white leading-none text-${this.props.color}-600 rounded-full p-2 shadow text-sm`}>
                <span className={`inline-flex bg-${this.props.color}-600 text-white rounded-full h-6 px-3 justify-center items-center`}>{this.props.title}</span>
                <span className="inline-flex px-2">{this.props.message}</span>
                {/* onClick={this.onClose} */}
            </div>
        </div>
      )
    );
  }
}

export default AlertBox;