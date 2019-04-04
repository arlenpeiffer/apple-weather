import React from "react";
import Day from "./Day";
import Hour from "./Hour";
import Parameter from "./Parameter";
import Today from "./Today";

function Location(props) {
  let today = props.data.week.slice(0, 1);
  today = today[0];
  const week = props.data.week.slice(1);

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.data.current.description}</p>
      <p>{props.data.current.currentTemp}°</p>
      <Today day={today} />
      <div>
        {props.data.hour.map(hour => (
          <Hour key={hour.index} hour={hour} />
        ))}
      </div>
      <div>
        {week.map(day => (
          <Day key={day.index} day={day} />
        ))}
      </div>
      <p>Detailed description goes here</p>
      <Parameter title="SUNRISE" measurement={props.data.current.sunrise} />
      <Parameter title="SUNSET" measurement={props.data.current.sunset} />
      <Parameter
        title="CHANCE OF RAIN"
        measurement={props.data.current.precipitationChance + "%"}
      />
      <Parameter
        title="HUMIDITY"
        measurement={props.data.current.humidity + "%"}
      />
      <Parameter
        title="WIND"
        measurement={
          props.data.current.wind.direction +
          " " +
          props.data.current.wind.speed +
          " mph"
        }
      />
      <Parameter
        title="FEELS LIKE"
        measurement={props.data.current.feelsLike + "°"}
      />
      <Parameter
        title="PRECIPITATION"
        measurement={props.data.current.precipitation + " in"}
      />
      <Parameter
        title="PRESSURE"
        measurement={props.data.current.pressure + " inHg"}
      />
      <Parameter
        title="VISIBILITY"
        measurement={props.data.current.visibility + " mi"}
      />
      <Parameter title="UV INDEX" measurement={props.data.current.uvIndex} />
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
