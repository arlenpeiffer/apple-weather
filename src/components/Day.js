import React from "react";

import "./Day.css";
import "../weather-icons/css/weather-icons.css";

function Day(props) {
  const { high, icon, low, weekday } = props.day;

  return (
    <div className="day">
      <p>{weekday}</p>
      <i className={"wi wi-forecast-io-" + icon} />
      <div className="high-low">
        <p>{Math.round(high) + "°"}</p>
        <p>{Math.round(low) + "°"}</p>
      </div>
    </div>
  );
}

export default Day;
