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

  componentDidMount() {
    this.fetchGeocode();
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

  componentDidUpdate(prevProps, prevState) {
    const { locationsZip } = this.state;
    if (locationsZip > prevState.locationsZip) {
      return this.fetchGeocode();
    }
  }

  fetchGeocode() {
    const apiURL = "https://www.zipcodeapi.com/rest/";
    const apiKey =
      "js-4YEildaWSfCQ97RkfEukPAI6r4duAPNQyh2KWd3yiFXcGHGE3M2cpBHlm1u292yG/";
    const apiFormat = "info.json/";
    const apiUnits = "/degrees";

    const { locationsGeo, locationsZip } = this.state;
    // this.setState({ error: null });
    locationsZip.map(location =>
      fetch(apiURL + apiKey + apiFormat + location + apiUnits)
        .then(response => response.json())
        .then(data =>
          this.setState({
            locationsGeo: locationsGeo.concat(data.lat + "," + data.lng)
          })
        )
    );
  }

  render() {
    const { error, locationsGeo } = this.state;
    return (
      <div>
        <Input validateInput={this.validateInput} />
        {error && <p>{error}</p>}
        <Locations locations={locationsGeo} />
      </div>
    );
  }
}

export default App;
