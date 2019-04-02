import React from "react";

function Parameter(props) {
  return (
    <div>
      <p>
        <b>{props.title}</b>
      </p>
      <p>{props.measurement}</p>
    </div>
  );
}

export default Parameter;
