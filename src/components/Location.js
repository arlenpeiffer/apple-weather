import React from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        currentTemp: null,
        description: null,
        feelsLike: null,
        humidity: null,
        icon: null,
        precipitation: null,
        precipitationChance: null,
        pressure: null,
        uvIndex: null,
        visibility: null,
        wind: {
          direction: null,
          speed: null
        }
      },
      error: null,
      loading: false
    };
  }
  componentDidMount() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api =
      "https://api.darksky.net/forecast/1b3d30bceaa757a136e3c1dfad9801d8/";
    fetch(proxy + api + this.props.location)
      .then(response => response.json())
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
    // .then(data => console.log(data));
  }
  render() {
    const { data } = this.state;
    return (
      <div key={this.props.location}>
        <p>Location Name:</p>
        <p>{data.description}</p>
        <p>{data.currentTemp}°</p>
        <div>Hourly goes here</div>
        <div>Daily forecast goes here</div>
        <p>Detailed description goes here</p>
        <div>
          <p>SUNRISE</p>
          <p>goes here</p>
        </div>
        <div>
          <p>SUNSET</p>
          <p>goes here</p>
        </div>
        <div>
          <p>CHANCE OF RAIN</p>
          <p>{data.precipitationChance}</p>
        </div>
        <div>
          <p>HUMIDITY</p>
          <p>{data.humidity}%</p>
        </div>
        <div>
          <p>WIND</p>
          <p>
            {data.wind.direction} {data.wind.speed}
          </p>
        </div>
        <div>
          <p>FEELS LIKE</p>
          <p>{data.feelsLike}°</p>
        </div>
        <div>
          <p>PRECIPITATION</p>
          <p>{data.precipitation} in</p>
        </div>
        <div>
          <p>PRESSURE</p>
          <p>{data.pressure}</p>
        </div>
        <div>
          <p>VISIBILITY</p>
          <p>{data.visibility}</p>
        </div>
        <div>
          <p>UV INDEX</p>
          <p>{data.uvIndex}</p>
        </div>
      </div>
    );
  }
}

export default Location;

// humidity: data.currently.humidity
// wind: {
//     bearing: data.currently.windBearing --- convert to NW/SW/etc from degrees
//     speed: data.currently.windSpeed --- convert from meters per second
// }
// description: data.currently.summary
// icon: data.currently.icon
// currentTemp: data.currently.temperature
// feelsLike: data.currently.apparentTemperature
// pressure: data.currently.pressure ---- convert mbar to inHg
// precipitation: data.currently.precipIntensity (in)
// precipitationChance: data.currently.precipProbability (%)
// visibility: data.currently.visibility
// uvIndex: data.currently.uvIndex
