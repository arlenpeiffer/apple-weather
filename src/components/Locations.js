import React from "react";
import Location from "./Location";

function Locations(props) {
  return (
    <div>
      {props.locations.map((location, index) => (
        <Location
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
