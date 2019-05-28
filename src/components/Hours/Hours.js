import React from 'react';
import { Hour } from '../Hour';
import './Hours.scss';

function Hours(props) {
  return (
    <div className="hours">
      {props.hours.map(hour => (
        <Hour key={hour.index} hour={hour} />
      ))}
    </div>
  );
}

export default Hours;
