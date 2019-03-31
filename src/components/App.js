import React from "react";
import Input from "./Input";
import Locations from "./Locations";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
    this.state = {
      error: null,
      zips: []
    };
  }
  addLocation(zip) {
    const { zips } = this.state;
    if (zips.includes(zip)) {
      return this.setState({ error: "That zip already exists" });
    } else {
      return this.setState({ zips: zips.concat(zip) });
    }
  }
  render() {
    const { error, zips } = this.state;
    return (
      <div>
        <Input addLocation={this.addLocation} />
        {error && <p>{error}</p>}
        <Locations zips={zips} />
      </div>
    );
  }
}

export default App;
