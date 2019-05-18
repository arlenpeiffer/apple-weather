import React from "react";
import { Icon } from "semantic-ui-react";

import "./Location.css";

function Location(props) {
  return (
    <div className="location">
      <Icon
        name="circle"
        onClick={() => props.setSelectedIndex(props.index)}
        size="small"
      />
    </div>
  );
}

export default Location;
