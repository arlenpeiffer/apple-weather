import React from "react";
import moment from "moment-timezone";
import SelectedLocation from "./SelectedLocation";

class SelectedLocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false
    };
  }

  convertPressure(mbar) {
    const inHg = mbar / 33.863886666667;
    return inHg.toFixed(2);
  }

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

    return hourlyArray.slice(0, 26).map((hour, index) => {
      // NOW
      if (index === 0) {
        return {
          icon: hour.icon,
          index: index,
          temp: Math.round(hour.temperature) + "°",
          time: "Now"
        };
        // SUNRISE
      } else if (hour.icon === "sunrise") {
        return {
          icon: hour.icon,
          index: index,
          description: "Sunrise",
          time: this.convertUnix(hour.time * 1000, "h:mmA")
        };
        // SUNSET
      } else if (hour.icon === "sunset") {
        return {
          icon: hour.icon,
          index: index,
          description: "Sunset",
          time: this.convertUnix(hour.time * 1000, "h:mmA")
        };
      }
      // DEFAULT
      return {
        icon: hour.icon,
        index: index,
        temp: Math.round(hour.temperature) + "°",
        time: this.convertUnix(hour.time * 1000, "hA")
      };
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.geocode !== nextProps.geocode) {
      this.setState({ loading: true }, this.fetchData());
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.geocode !== nextProps.geocode ||
      this.state.loading !== nextState.loading
    );
  }

  fetchData() {
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
              description: data.currently.summary,
              feelsLike: Math.round(data.currently.apparentTemperature),
              humidity: Math.round(data.currently.humidity * 100),
              icon: data.currently.icon,
              precipitation: data.currently.precipIntensity,
              precipitationChance: data.currently.precipProbability,
              pressure: this.convertPressure(data.currently.pressure),
              summary: data.daily.data[0].summary,
              sunrise: this.convertUnix(
                data.daily.data[0].sunriseTime * 1000,
                "h:mm A"
              ),
              sunset: this.convertUnix(
                data.daily.data[0].sunsetTime * 1000,
                "h:mm A"
              ),
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
    const loadingPadding = {
      padding: "25px 0 0 0"
    };

    if (loading) {
      return <p style={loadingPadding}>Loading..</p>;
    } else {
      return <SelectedLocation name={this.props.name} data={data} />;
    }
  }
}

export default SelectedLocationContainer;
