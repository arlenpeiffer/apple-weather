import React from "react";
import Day from "./Day";
import Hours from "./Hours";
import Parameter from "./Parameter";
import Today from "./Today";
import { Divider } from "semantic-ui-react";

import "./SelectedLocation.css";

function SelectedLocation(props) {
  if (props.data) {
    let today = props.data.week.slice(0, 1);
    today = today[0];
    const week = props.data.week.slice(1);

    return (
      <div className="selected-location">
        <h1>{props.name}</h1>
        <p>{props.data.current.description}</p>
        <p className="current-temp">{props.data.current.currentTemp}°</p>
        <Today day={today} />
        <Divider />
        <Hours hours={props.data.hour} />
        <Divider />
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
  return null;
}

export default SelectedLocation;
