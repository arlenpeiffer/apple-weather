import React from "react";
import "./Hour.css";

function Now(props) {
  return (
    <div className="hour">
      <p>Now</p>
      <p>{props.hour.icon}</p>
      <p>{props.hour.temp}°</p>
    </div>
  );
}

export default Now;
