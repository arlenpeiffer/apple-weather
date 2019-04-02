import React from "react";

function Parameter(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.measurement}</p>
    </div>
  );
}

export default Parameter;
