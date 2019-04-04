import React from "react";

function Today(props) {
  return (
    <div>
      <p>
        <b>{props.day.weekday}</b>
      </p>
      <p>TODAY</p>
      <p>High: {Math.round(props.day.high) + "°"}</p>
      <p>Low: {Math.round(props.day.low) + "°"}</p>
    </div>
  );
}

export default Today;
