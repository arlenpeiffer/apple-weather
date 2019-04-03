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
  convertPressure(mbar) {
    const inHg = mbar / 33.863886666667;
    return inHg.toFixed(2);
  }

  // FOR LATER: FIND A BETTER/SIMPLER WAY TO CONVERT WIND BEARING //
  convertWindBearing(degree) {
    if (degree >= 348.75 && degree < 11.25) {
      return "N";
    }
    if (degree >= 11.25 && degree < 33.75) {
      return "NNE";
    }
    if (degree >= 33.75 && degree < 56.25) {
      return "NE";
    }
    if (degree >= 56.25 && degree < 78.75) {
      return "ENE";
    }
    if (degree >= 78.75 && degree < 101.25) {
      return "E";
    }
    if (degree >= 101.25 && degree < 123.75) {
      return "ESE";
    }
    if (degree >= 123.75 && degree < 146.25) {
      return "SE";
    }
    if (degree >= 146.25 && degree < 168.75) {
      return "SSE";
    }
    if (degree >= 168.75 && degree < 191.25) {
      return "S";
    }
    if (degree >= 191.25 && degree < 213.75) {
      return "SSW";
    }
    if (degree >= 213.75 && degree < 236.25) {
      return "SW";
    }
    if (degree >= 236.25 && degree < 258.75) {
      return "WSW";
    }
    if (degree >= 258.75 && degree < 281.25) {
      return "W";
    }
    if (degree >= 281.25 && degree < 303.75) {
      return "WNW";
    }
    if (degree >= 303.75 && degree < 326.25) {
      return "NW";
    }
    if (degree >= 326.25 && degree < 348.75) {
      return "NNW";
    }
  }

  convertEpoch(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return date.toTimeString();
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
            currentTemp: Math.round(data.currently.temperature),
            description: data.currently.summary,
            feelsLike: Math.round(data.currently.apparentTemperature),
            humidity: Math.round(data.currently.humidity * 100),
            icon: data.currently.icon,
            precipitation: data.currently.precipIntensity,
            precipitationChance: data.currently.precipProbability,
            pressure: this.convertPressure(data.currently.pressure),
            sunrise: this.convertEpoch(data.daily.data[0].sunriseTime),
            sunset: data.daily.data[0].sunsetTime,
            uvIndex: data.currently.uvIndex,
            visibility: Math.round(data.currently.visibility),
            wind: {
              direction: this.convertWindBearing(data.currently.windBearing),
              speed: Math.round(data.currently.windSpeed)
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
