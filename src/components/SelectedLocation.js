import React from "react";
import { Divider } from "semantic-ui-react";
import Day from "./Day";
import Hours from "./Hours";
import Parameter from "./Parameter";
import Today from "./Today";
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
        <div className="pad">
          <Today day={today} />
        </div>

        <Divider />
        <Hours hours={props.data.hour} />
        <Divider />

        <div className="pad">
          {week.map(day => (
            <Day key={day.index} day={day} />
          ))}
        </div>

        <Divider />
        <p>{props.data.current.summary}</p>
        <Divider />

        <div className="pad">
          <div className="parameter-container">
            <div className="parameter-row">
              <Parameter
                title="SUNRISE"
                measurement={props.data.current.sunrise}
              />
              <Parameter
                title="SUNSET"
                measurement={props.data.current.sunset}
              />
            </div>
            <Divider />
          </div>

          <div className="parameter-container">
            <div className="parameter-row">
              <Parameter
                title="CHANCE OF RAIN"
                measurement={props.data.current.precipitationChance + "%"}
              />
              <Parameter
                title="HUMIDITY"
                measurement={props.data.current.humidity + "%"}
              />
            </div>
            <Divider />
          </div>

          <div className="parameter-container">
            <div className="parameter-row">
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
            </div>
            <Divider />
          </div>

          <div className="parameter-container">
            <div className="parameter-row">
              <Parameter
                title="PRECIPITATION"
                measurement={props.data.current.precipitation + " in"}
              />
              <Parameter
                title="PRESSURE"
                measurement={props.data.current.pressure + " inHg"}
              />
            </div>
            <Divider />
          </div>

          <div className="parameter-container">
            <div className="parameter-row">
              <Parameter
                title="VISIBILITY"
                measurement={props.data.current.visibility + " mi"}
              />
              <Parameter
                title="UV INDEX"
                measurement={props.data.current.uvIndex}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default SelectedLocation;
