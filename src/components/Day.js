import React from "react";

function Day(props) {
  return (
    <div>
      <p>
        <b>{props.day.weekday}</b>
      </p>
      <p>{props.day.icon}</p>
      <p>High: {Math.round(props.day.high) + "°"}</p>
      <p>Low: {Math.round(props.day.low) + "°"}</p>
    </div>
  );
}

export default Day;
