import React from "react";

import "./Day.css";
import "../weather-icons/css/weather-icons.css";

function Day(props) {
  const { high, icon, low, weekday } = props.day;

  return (
    <div className="row">
      <p>{weekday}</p>
      <i className={"wi wi-forecast-io-" + icon} />
      <p>High: {Math.round(high) + "°"}</p>
      <p>Low: {Math.round(low) + "°"}</p>
    </div>
  );
}

export default Day;
