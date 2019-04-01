import React from "react";
import Input from "./Input";
import Locations from "./Locations";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      error: null,
      locationsGeo: [],
      locationsZip: []
    };
  }

  validateInput(input) {
    if (isNaN(input)) {
      return this.onValidationFailure();
    }
    if (input.includes(".")) {
      return this.onValidationFailure();
    }
    if (input.trim() === "") {
      return this.onValidationFailure();
    }
    if (input.length !== 5) {
      return this.onValidationFailure();
    } else {
      return this.onValidationSuccess(input);
    }
  }
  onValidationFailure() {
    this.setState({
      error: "Please enter a valid 5 digit zip code"
    });
  }
  onValidationSuccess(input) {
    const { locationsZip } = this.state;
    if (locationsZip.includes(input)) {
      return this.setState({ error: "That zip already exists" });
    }
    this.addLocation(input);
  }

  addLocation(input) {
    const { locationsZip } = this.state;
    this.setState({ error: null, locationsZip: locationsZip.concat(input) });
  }

  render() {
    const { error, locationsZip } = this.state;
    return (
      <div>
        <Input validateInput={this.validateInput} />
        {error && <p>{error}</p>}
        <Locations locations={locationsZip} />
      </div>
    );
  }
}

export default App;
