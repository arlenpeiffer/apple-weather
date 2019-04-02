import React from "react";
import Location from "./Location";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.locations.map(location => (
        <Location location={location.geocode} name={location.name} />
      ))}
    </div>
  );
}

export default Locations;
