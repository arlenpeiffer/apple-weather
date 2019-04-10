import React from "react";
import Hour from "./Hour";
import Now from "./Now";
import "./Hours.css";

function Hours(props) {
  let hours24 = props.hours.slice(1, 24);
  let now = props.hours.slice(0, 1);

  return (
    <div className="hours">
      {now.map(hour => (
        <Now key={hour.index} hour={hour} />
      ))}
      {hours24.map(hour => (
        <Hour key={hour.index} hour={hour} />
      ))}
    </div>
  );
}

export default Hours;
