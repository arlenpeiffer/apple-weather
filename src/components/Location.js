import React from "react";
import "./Location.css";

function Location(props) {
  return (
    <i className="location" onClick={() => props.setSelectedIndex(props.index)}>
      •
    </i>
  );
}

export default Location;
