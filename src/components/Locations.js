import React from "react";
import Location from "./Location";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.locations.map(location => (
        <Location key={location} location={location} />
      ))}
    </div>
  );
}

export default Locations;
