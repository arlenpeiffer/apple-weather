import React from 'react';
import './Parameter.css';

function Parameter(props) {
  return (
    <div>
      <p className="title">{props.title}</p>
      <p className="measurement">{props.measurement}</p>
    </div>
  );
}

export default Parameter;
