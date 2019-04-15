import React from "react";
import "./Hour.css";

function Hour(props) {
  return (
    <div className="hour">
      <p>{props.hour.time}</p>
      <p>{props.hour.icon}</p>
      <p>{props.hour.temp}</p>
    </div>
  );
}

export default Hour;
