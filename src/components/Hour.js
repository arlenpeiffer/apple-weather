import React from "react";

import "./Hour.css";
import "../weather-icons/css/weather-icons.css";

function Hour(props) {
  const { description, icon, temp, time } = props.hour;
  const darkSkyPrefix = "wi wi-forecast-io-";

  return (
    <div className="hour">
      <p>{time}</p>
      <i className={darkSkyPrefix + icon} />
      <p>{temp || description}</p>
    </div>
  );
}

export default Hour;
