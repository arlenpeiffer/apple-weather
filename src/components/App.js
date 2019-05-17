import React from "react";
import Input from "./Input";
import Locations from "./Locations";
import SelectedLocationContainer from "./SelectedLocationContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.validateInput = this.validateInput.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.state = {
      error: null,
      locations: [],
      selectedIndex: null
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
    this.fetchGeocode(input);
  }

  fetchGeocode(zip) {
    const apiURL =
      "https://api.geocod.io/v1.3/geocode/?api_key=1cd20544cdcccccd65fb524cddd00f16cd126cf&fields=timezone&q=";
    fetch(apiURL + zip)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.setState({
          error: "network error"
        });
      })
      .then(data => {
        if (data.results.length === 0) {
          return this.setState({
            error: "No data for this zip code"
          });
        }
        const { locations, selectedIndex } = this.state;
        const city = data.results[0].address_components.city;
        const state = data.results[0].address_components.state;
        const latitude = data.results[0].location.lat;
        const longitude = data.results[0].location.lng;
        const timezone = data.results[0].fields.timezone.name;
        this.setState({
          error: null,
          locations: locations.concat({
            name: city + ", " + state,
            geocode: latitude + "," + longitude,
            timezone: timezone
          }),
          selectedIndex: locations.length
        });
        // this.getSelectedLocation(selectedIndex);
      })
      .catch(error => console.log(error));
  }

  setSelectedIndex = index => {
    this.setState({
      selectedIndex: index
    });
  };

  getSelectedLocation(index) {
    const { locations, selectedIndex } = this.state;
    const selectedLocation = locations[index];
    if (locations.length > 0) {
      console.log("new component", this.state);
      return (
        <SelectedLocationContainer
          geocode={selectedLocation.geocode}
          name={selectedLocation.name}
          timezone={selectedLocation.timezone}
        />
      );
    }
  }

  render() {
    const { error, locations, selectedIndex } = this.state;
    const selectedLocation = locations[selectedIndex];
    return (
      <div>
        <Input validateInput={this.validateInput} />
        {error && <p>{error}</p>}
        <Locations
          locations={locations}
          setSelectedIndex={this.setSelectedIndex}
        />
        {this.getSelectedLocation(selectedIndex)}
        {/* {selectedLocation && (
          <SelectedLocationContainer
            geocode={selectedLocation.geocode}
            name={selectedLocation.name}
            timezone={selectedLocation.timezone}
          />
        )} */}
      </div>
    );
  }
}

export default App;
