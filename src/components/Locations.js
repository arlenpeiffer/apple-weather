import React from "react";
import LocationContainer from "./LocationContainer";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.locations.map((location, index) => (
        <LocationContainer
          geocode={location.geocode}
          index={index}
          key={index}
          name={location.name}
          timezone={location.timezone}
        />
      ))}
    </div>
  );
}

export default Locations;
