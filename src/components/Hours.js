import React from "react";
import Hour from "./Hour";
import Now from "./Now";
import "./Hours.css";

function Hours(props) {
  let now = props.hours.slice(0, 1);

  return (
    <div className="hours">
      {now.map(hour => (
        <Now key={hour.index} hour={hour} />
      ))}
      {props.hours.map(hour => (
        <Hour key={hour.index} hour={hour} />
      ))}
    </div>
  );
}

export default Hours;
