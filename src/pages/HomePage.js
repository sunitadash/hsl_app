import React, { Component } from "react";
import mqtt from "mqtt";
import logo from "./hsl.png";
import Clock from "../components/Clock";
import StopDetails from "../components/StopDetails";
import get from "lodash.get";
import "./HomePage.css";

class HomePage extends Component {
  state = {
    nextStop: -1
  };

  componentWillMount() {
    const { operatorId, busId } = this.props;
    this.mqtt = mqtt.connect("wss://mqtt.hsl.fi");
    this.mqtt.on("connect", () => {
      console.log("MQTT Connected");
      //   this.mqtt.subscribe("/hfp/v1/journey/ongoing/bus/#");
      this.mqtt.subscribe(
        "/hfp/v1/journey/ongoing/bus/" + operatorId + "/" + busId + "/#"
      );
    });

    this.mqtt.on("message", (topic, msg, packet) => {
      const [, , , , , , , , , , headSign, , nextStopId] = topic.split("/");

      const data = JSON.parse(msg);
      const routeNo = get(data, "VP.desi");

      this.setState({
        routeNo,
        headSign,
        nextStopId
      });
    });
  }

  render() {
    const { routeNo, headSign, nextStopId } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>
            {routeNo} {headSign}
          </h4>
          <Clock />
        </header>
        <StopDetails stopId={nextStopId} />
      </div>
    );
  }
}

export default HomePage;
