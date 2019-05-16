import React from "react";
import Input from "./Input";
import Locations from "./Locations";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      error: null,
      locations: [],
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
    this.checkLocation(input);
  }

  checkLocation(input) {
    const { locations } = this.state;
    const apiURL =
      "https://api.geocod.io/v1.3/geocode/?api_key=1cd20544cdcccccd65fb524cddd00f16cd126cf&fields=timezone&q=";

    fetch(apiURL + input)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.setState({ error: "network error" });
      })
      .then(data => {
        const city = data.results[0].address_components.city;
        const state = data.results[0].address_components.state;
        const latitude = data.results[0].location.lat;
        const longitude = data.results[0].location.lng;
        const timezone = data.results[0].fields.timezone.name;

        if (data.results.length === 0) {
          return this.setState({
            error: "No data for this zip code"
          });
        }
        this.setState({
          locations: locations.concat({
            name: city + ", " + state,
            geocode: latitude + "," + longitude,
            timezone: timezone
          })
        });
        this.addLocation(input);
      });
  }

  addLocation(input) {
    const { locationsZip } = this.state;
    this.setState(
      { error: null, locationsZip: locationsZip.concat(input) }
      // this.fetchGeocode
    );
  }

  fetchGeocode() {
    const apiURL =
      "https://api.geocod.io/v1.3/geocode/?api_key=1cd20544cdcccccd65fb524cddd00f16cd126cf&fields=timezone&q=";

    const { locations, locationsZip } = this.state;
    locationsZip.map(location =>
      fetch(apiURL + location)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          this.setState({
            error: "network error"
          });
        })

        .then(data => {
          const city = data.results[0].address_components.city;
          const state = data.results[0].address_components.state;
          const latitude = data.results[0].location.lat;
          const longitude = data.results[0].location.lng;
          const timezone = data.results[0].fields.timezone.name;
          this.setState({
            locations: locations.concat({
              name: city + ", " + state,
              geocode: latitude + "," + longitude,
              timezone: timezone
            })
          });
        })
        .catch(error => console.log(error))
    );
  }

  render() {
    const { error, locations } = this.state;
    return (
      <div>
        <Input validateInput={this.validateInput} />
        {error && <p>{error}</p>}
        <Locations locations={locations} />
      </div>
    );
  }
}

export default App;
