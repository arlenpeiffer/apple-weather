import React from "react";
import "./Day.css";

function Today(props) {
  return (
    <div className="row">
      <p>{props.day.weekday}</p>
      <p>TODAY</p>
      <p>High: {Math.round(props.day.high) + "°"}</p>
      <p>Low: {Math.round(props.day.low) + "°"}</p>
    </div>
  );
}

export default Today;
