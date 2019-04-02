import React from "react";
import Location from "./Location";

class LocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: {
      //   currentTemp: null,
      //   description: null,
      //   feelsLike: null,
      //   humidity: null,
      //   icon: null,
      //   precipitation: null,
      //   precipitationChance: null,
      //   pressure: null,
      //   uvIndex: null,
      //   visibility: null,
      //   wind: {
      //     direction: null,
      //     speed: null
      //   }
      // },
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api =
      "https://api.darksky.net/forecast/1b3d30bceaa757a136e3c1dfad9801d8/";
    fetch(proxy + api + this.props.location)
      .then(response => {
        if (response.ok) {
          this.setState({ loading: true });
          return response.json();
        }
      })
      .then(data =>
        this.setState({
          data: {
            currentTemp: data.currently.temperature,
            description: data.currently.summary,
            feelsLike: data.currently.apparentTemperature,
            humidity: data.currently.humidity,
            icon: data.currently.icon,
            precipitation: data.currently.precipIntensity,
            precipitationChance: data.currently.precipProbability,
            pressure: data.currently.pressure,
            uvIndex: data.currently.uvIndex,
            visibility: data.currently.visibility,
            wind: {
              direction: data.currently.windBearing,
              speed: data.currently.windSpeed
            }
          },
          error: null,
          loading: false
        })
      );
  }
  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <p>Loading..</p>;
    } else {
      return <Location name={this.props.name} data={data} />;
    }
  }
}

export default LocationContainer;
