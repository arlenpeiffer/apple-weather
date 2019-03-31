import React from "react";
import Location from "./Location";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.zips.map(zip => (
        <Location zip={zip} />
      ))}
    </div>
  );
}

export default Locations;
