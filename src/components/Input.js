import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      input: ""
    };
  }
  onChange(event) {
    this.setState({ input: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    this.props.validateInput(input);
    this.setState({ input: "" });
  }
  render() {
    const { input } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={input} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Input;
