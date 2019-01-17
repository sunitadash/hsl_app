import React, { Component } from "react";
import moment from "moment";
import "moment/locale/fi";
import "./Clock.css";

class Clock extends Component {
  state = {
    time: moment()
      .locale("fi", "en")
      .format("LT")
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment()
        .locale("fi", "en")
        .format("LT")
    });
  }
  render() {
    return <div className="App-clock">{this.state.time}</div>;
  }
}

export default Clock;
