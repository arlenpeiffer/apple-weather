import React from "react";
import "../weather-icons/css/weather-icons.css";
import "./Day.css";

function Day(props) {
  const { high, icon, low, weekday } = props.day;
  return (
    <div className="day">
      <p>{weekday}</p>
      <i className={"wi wi-forecast-io-" + icon} />
      <div className="high-low">
        <p className="high">{Math.round(high) + "°"}</p>
        <p className="low">{Math.round(low) + "°"}</p>
      </div>
    </div>
  );
}

export default Day;
