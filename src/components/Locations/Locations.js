import React from 'react';
import { Location } from '../Location';
import './Locations.scss';

function Locations(props) {
  return (
    <div className="locations">
      {props.locations.map((location, index) => (
        <Location
          geocode={location.geocode}
          index={index}
          key={index}
          name={location.name}
          setSelectedIndex={props.setSelectedIndex}
          timezone={location.timezone}
        />
      ))}
    </div>
  );
}

export default Locations;
