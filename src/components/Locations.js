import React from "react";
import LocationContainer from "./LocationContainer";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.locations.map(location => (
        <LocationContainer location={location.geocode} name={location.name} />
      ))}
    </div>
  );
}

export default Locations;
