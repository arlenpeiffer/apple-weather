import React from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      data: {
        summary: null
      }
    };
  }
  componentDidMount() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api =
      "https://api.darksky.net/forecast/1b3d30bceaa757a136e3c1dfad9801d8/";
    fetch(proxy + api + this.props.location)
      .then(response => response.json())
      .then(data => this.setState({ data: { summary: data.hourly.summary } }));
  }
  render() {
    const { data } = this.state;
    return <div key={this.props.location}>{data.summary}</div>;
  }
}

export default Location;
