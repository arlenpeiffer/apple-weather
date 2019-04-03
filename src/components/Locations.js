import React from "react";
import LocationContainer from "./LocationContainer";

function Locations(props) {
  return (
    <div>
      Locations:
      {props.locations.map((location, index) => (
        <LocationContainer
          index={index}
          key={index}
          name={location.name}
          geocode={location.geocode}
          // timezone={location.timezone}
          utcOffset={location.utcOffset}
        />
      ))}
    </div>
  );
}

export default Locations;
