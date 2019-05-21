import React from "react";
import "../weather-icons/css/weather-icons.css";
import "./Hour.css";

function Hour(props) {
  const { description, icon, temp, time } = props.hour;
  return (
    <div className="hour">
      <p>{time}</p>
      {description ? (
        <i className={"wi wi-" + icon} />
      ) : (
        <i className={"wi wi-forecast-io-" + icon} />
      )}
      <p>{temp || description}</p>
    </div>
  );
}

export default Hour;
