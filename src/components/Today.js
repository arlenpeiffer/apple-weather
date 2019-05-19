import React from "react";
import "./Today.css";

function Today(props) {
  return (
    <div className="day">
      <p>{props.day.weekday}</p>
      <i id="today">TODAY</i>
      <div className="high-low">
        <p>{Math.round(props.day.high) + "°"}</p>
        <p>{Math.round(props.day.low) + "°"}</p>
      </div>
    </div>
  );
}

export default Today;
