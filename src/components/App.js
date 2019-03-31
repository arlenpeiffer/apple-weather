import React from "react";
import Input from "./Input";
import Locations from "./Locations";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
    this.state = {
      zips: [91030]
    };
  }
  addLocation(zip) {
    const { zips } = this.state;
    this.setState({ zips: zips.concat(zip) });
  }
  render() {
    const { zips } = this.state;
    return (
      <div>
        <Input addLocation={this.addLocation} />
        <Locations zips={zips} />
      </div>
    );
  }
}

export default App;
