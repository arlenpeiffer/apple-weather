import React from "react";
import "./Day.css";

function Today(props) {
  return (
    <div className="day">
      <p>{props.day.weekday}</p>
      <i>TODAY</i>
      <div className="high-low">
        <p className="high">{Math.round(props.day.high) + "°"}</p>
        <p className="low">{Math.round(props.day.low) + "°"}</p>
      </div>
    </div>
  );
}

export default Today;
