import React from "react";
import Hour from "./Hour";

function Hours(props) {
  let hours24 = props.hours.slice(0, 24);

  return (
    <div>
      {hours24.map(hour => (
        <Hour key={hour.index} hour={hour} />
      ))}
    </div>
  );
}

export default Hours;
