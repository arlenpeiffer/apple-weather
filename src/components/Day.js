import React from "react";

import "./Day.css";
import "../weather-icons/css/weather-icons.css";

function Day(props) {
  const { high, icon, low, weekday } = props.day;
  const darkSkyPrefix = "wi wi-forecast-io-";

  return (
    <div className="row">
      <p>{weekday}</p>
      <i className={darkSkyPrefix + icon} />
      <p>High: {Math.round(high) + "°"}</p>
      <p>Low: {Math.round(low) + "°"}</p>
    </div>
  );
}

export default Day;
