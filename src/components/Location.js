import React from "react";

function Location(props) {
  return (
    <div key={props.name}>
      <p>{props.name}</p>
      <p>{props.data.description}</p>
      <p>{props.data.currentTemp}°</p>
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
        <p>{props.data.precipitationChance}</p>
      </div>
      <div>
        <p>HUMIDITY</p>
        <p>{props.data.humidity}%</p>
      </div>
      <div>
        <p>WIND</p>
        <p>
          {props.data.wind.direction} {props.data.wind.speed}
        </p>
      </div>
      <div>
        <p>FEELS LIKE</p>
        <p>{props.data.feelsLike}°</p>
      </div>
      <div>
        <p>PRECIPITATION</p>
        <p>{props.data.precipitation} in</p>
      </div>
      <div>
        <p>PRESSURE</p>
        <p>{props.data.pressure}</p>
      </div>
      <div>
        <p>VISIBILITY</p>
        <p>{props.data.visibility}</p>
      </div>
      <div>
        <p>UV INDEX</p>
        <p>{props.data.uvIndex}</p>
      </div>
    </div>
  );
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
