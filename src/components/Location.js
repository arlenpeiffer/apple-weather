import React from "react";

function Location(props) {
  return (
    <div>
      <h1 onClick={() => props.setSelectedIndex(props.index)}>•</h1>
    </div>
  );
}

export default Location;
