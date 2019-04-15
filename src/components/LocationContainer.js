import React from "react";
import Location from "./Location";
import moment from "moment-timezone";

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

  convertUnix(timestamp, format) {
    const timezone = this.props.timezone;
    const date = moment(timestamp).tz(timezone);
    return date.format(format);
  }

  // CHECKS IF TIME IS AM/PM
  // ADDS 12 TO HOUR IF PM
  // RETURNS HOUR AS A NUMBER
  checkPM(time) {
    if (time.includes("PM")) {
      if (time.includes("12")) {
        time = "0 PM";
      }
      time = parseInt(time) + 12;
    } else {
      time = parseInt(time);
    }
    return time;
  }

  // TAKES THE HOURLY FORECAST ARRAY AND A SUNRISE OR SUNSET TIME
  // CONVERTS THOSE TIMES TO AN HOUR (IN 24 HOUR) AND COMPARES TO GET THE INDEX OF SUNRISE/SUNSET
  // USES THAT INDEX TO INSERT A NEW ITEM IN THE ARRAY
  // findInsertPoint(array, sunArray, currentTime) {
  //   let time;
  //   if (currentTime > sunArray[0]) {
  //     time = sunArray[1];
  //   } else {
  //     time = sunArray[0];
  //   }

  //   let insertPoint = array.find(hour => hour.unix > time);
  //   insertPoint = insertPoint.index;
  //   console.log(insertPoint);

  //   const { data } = this.state;
  //   data.hour.splice(insertPoint, 0, {
  //     time: this.convertUnix(time * 1000, "h:m A")
  //   });
  //   console.log(data.hour);
  // }

  findInsertPoint(array, time, direction) {
    let insertPoint = array.findIndex(hour => hour.time > time);
    console.log("insert @", insertPoint);

    array.splice(insertPoint, 0, {
      icon: direction,
      time: this.convertUnix(time * 1000, "h:m A")
    });
    console.log(array.slice(0, 24));
  }

  create24HourForecast(hourlyArray, sunriseArray, sunsetArray, currentTime) {
    const sunriseToday = sunriseArray[0].sunriseTime;
    const sunriseTomorrow = sunriseArray[1].sunriseTime;
    const sunsetToday = sunsetArray[0].sunsetTime;
    const sunsetTomorrow = sunsetArray[1].sunsetTime;
    let sunrise;
    let sunset;

    if (currentTime > sunriseToday) {
      sunrise = sunriseTomorrow;
    } else {
      sunrise = sunriseToday;
    }

    if (currentTime > sunsetToday) {
      sunset = sunsetTomorrow;
    } else {
      sunset = sunsetToday;
    }

    // ADD SUNRISE
    let insertPoint = hourlyArray.findIndex(hour => hour.time > sunrise);
    hourlyArray.splice(insertPoint, 0, {
      icon: "sunrise",
      time: sunrise
    });
    // ADD SUNSET
    insertPoint = hourlyArray.findIndex(hour => hour.time > sunset);
    hourlyArray.splice(insertPoint, 0, {
      icon: "sunset",
      time: sunset
    });

    return hourlyArray.slice(0, 26).map((hour, index) => ({
      icon: hour.icon,
      index: index,
      temp: Math.round(hour.temperature),
      time: this.convertUnix(hour.time * 1000, "hA")
    }));

    // array.splice(insertPoint, 0, {
    //   icon: direction,
    //   time: this.convertUnix(time * 1000, "h:m A")
    // });

    // this.findInsertPoint(hourlyArray, sunrise, "sunrise");
    // this.findInsertPoint(hourlyArray, sunset, "sunset");
  }

  componentDidMount() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api =
      "https://api.darksky.net/forecast/1b3d30bceaa757a136e3c1dfad9801d8/";
    fetch(proxy + api + this.props.geocode)
      .then(response => {
        if (response.ok) {
          this.setState({ loading: true });
          return response.json();
        }
      })
      .then(data =>
        this.setState({
          data: {
            current: {
              currentTemp: Math.round(data.currently.temperature),
              // currentTime: data.currently.time,
              description: data.currently.summary,
              feelsLike: Math.round(data.currently.apparentTemperature),
              humidity: Math.round(data.currently.humidity * 100),
              icon: data.currently.icon,
              precipitation: data.currently.precipIntensity,
              precipitationChance: data.currently.precipProbability,
              pressure: this.convertPressure(data.currently.pressure),
              sunrise: this.convertUnix(
                data.daily.data[0].sunriseTime * 1000,
                "h:m A"
              ),
              // sunriseUnix: [
              //   data.daily.data[0].sunriseTime,
              //   data.daily.data[1].sunriseTime
              // ],
              // sunriseTomorrow: this.convertUnix(
              //   data.daily.data[1].sunriseTime * 1000,
              //   "h:m A"
              // ),
              sunset: this.convertUnix(
                data.daily.data[0].sunsetTime * 1000,
                "h:m A"
              ),
              // sunsetUnix: [
              //   data.daily.data[0].sunsetTime,
              //   data.daily.data[1].sunsetTime
              // ],
              // sunsetTomorrow: this.convertUnix(
              //   data.daily.data[1].sunsetTime * 1000,
              //   "h:m A"
              // ),
              timezone: data.timezone,
              uvIndex: data.currently.uvIndex,
              visibility: Math.round(data.currently.visibility),
              wind: {
                direction: this.convertWindBearing(data.currently.windBearing),
                speed: Math.round(data.currently.windSpeed)
              }
            },
            hour: this.create24HourForecast(
              data.hourly.data,
              data.daily.data.slice(0, 2),
              data.daily.data.slice(0, 2),
              data.currently.time
            ),
            // hour: data.hourly.data.slice(0, 24).map((hour, index) => ({
            //   icon: hour.icon,
            //   index: index,
            //   temp: Math.round(hour.temperature),
            //   time: this.convertUnix(hour.time * 1000, "hA"),
            //   unix: hour.time
            // })),
            week: data.daily.data.map((day, index) => ({
              icon: day.icon,
              index: index,
              high: day.temperatureHigh,
              low: day.temperatureLow,
              weekday: this.convertUnix(day.time * 1000, "dddd")
            }))
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
