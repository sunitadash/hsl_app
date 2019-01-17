import React, { Component } from "react";
import get from "lodash.get";
import moment from "moment";
import "./StopDetails.css";

class StopDetails extends Component {
  state = {
    stop: {}
  };

  componentDidMount() {
    this.interval = setInterval(this.refreshData.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshData() {
    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/graphql",
        Accept: "application/json"
      },
      body: `{
                stop(id: "HSL:${this.props.stopId}") {
                  name
                  stoptimesWithoutPatterns {
                    scheduledDeparture
                    realtimeDeparture
                    departureDelay
                    realtime
                    serviceDay
                    trip {
                        routeShortName
                        tripHeadsign
                      }
                    }          
                }
              }`
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ stop: res.data.stop });
      });
  }

  componentDidUpdate() {
    if (this.props.stopId === -1) return;
    this.refreshData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.stop.name === undefined) return true;
    return (
      nextProps.stopId !== this.props.stopId ||
      get(nextState, "stop.name", "") !== this.state.stop.name
    );
  }

  getTimeStamp(time) {
    const diff = moment.duration(moment(time).diff(moment())).asMinutes();
    if (diff > 30) {
      return moment(time).format("h:mm");
    } else {
      return parseInt(diff, 10);
    }
  }

  render() {
    const { stop = undefined } = this.state;
    return [
      stop && stop.stoptimesWithoutPatterns && (
        <h4 key="stop-name" style={{ textAlign: "center" }}>
          Vaihtoyhteydet pysäkiltä : {stop.name}
        </h4>
      ),
      stop && stop.stoptimesWithoutPatterns && (
        <table className="scheduled" key="scheduled">
          <thead align="left">
            <tr style={{ borderBottom: "2px solid white" }}>
              <th>Linja</th>
              <th>Määränpää</th>
              <th style={{ textAlign: "right" }}>Min</th>
            </tr>
          </thead>
          <tbody className="next-routes">
            {stop.stoptimesWithoutPatterns.map((bus, index) => (
              <tr
                key={index.toString()}
                style={{ borderBottom: "1px solid white" }}
              >
                <td>
                  <span className="bold">
                    {get(bus, "trip.routeShortName", "")}
                  </span>
                </td>

                <td>
                  <span>{get(bus, "trip.tripHeadsign", "")}</span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <span className="bold">
                    {this.getTimeStamp(
                      (bus.serviceDay + bus.realtimeDeparture) * 1000
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    ].filter(Boolean);
  }
}

export default StopDetails;
