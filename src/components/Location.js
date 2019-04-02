import React from "react";
import Parameter from "./Parameter";

function Location(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.data.description}</p>
      <p>{props.data.currentTemp}°</p>
      <div>Hourly goes here</div>
      <div>Daily forecast goes here</div>
      <p>Detailed description goes here</p>
      <Parameter title="SUNRISE" measurement={props.data.sunrise} />
      <Parameter title="SUNSET" measurement={props.data.sunset} />
      <Parameter
        title="CHANCE OF RAIN"
        measurement={props.data.precipitationChance + "%"}
      />
      <Parameter title="HUMIDITY" measurement={props.data.humidity + "%"} />
      <Parameter
        title="WIND"
        measurement={
          props.data.wind.direction + " " + props.data.wind.speed + " mph"
        }
      />
      <Parameter title="FEELS LIKE" measurement={props.data.feelsLike + "°"} />
      <Parameter
        title="PRECIPITATION"
        measurement={props.data.precipitation + " in"}
      />
      <Parameter title="PRESSURE" measurement={props.data.pressure + " inHg"} />
      <Parameter
        title="VISIBILITY"
        measurement={props.data.visibility + " mi"}
      />
      <Parameter title="UV INDEX" measurement={props.data.uvIndex} />
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
