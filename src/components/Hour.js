import React from "react";

function Hour(props) {
  return (
    <div>
      <p>
        {props.hour.time} - {props.hour.temp}°
      </p>
    </div>
  );
}

export default Hour;
