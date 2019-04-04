import React from "react";
import "./Day.css";

function Day(props) {
  return (
    <div className="row">
      <p>{props.day.weekday}</p>
      <p>{props.day.icon}</p>
      <p>High: {Math.round(props.day.high) + "°"}</p>
      <p>Low: {Math.round(props.day.low) + "°"}</p>
    </div>
  );
}

export default Day;
