import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: null,
      input: ""
    };
  }

  onChange(event) {
    this.setState({ input: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    this.validateInput(input);
  }

  validateInput(input) {
    if (input.trim() === "") {
      return this.onValidationFailure();
    }
    if (isNaN(input)) {
      return this.onValidationFailure();
    }
    if (input.length !== 5) {
      return this.onValidationFailure();
    }
    if (input.includes(".")) {
      // if (!Number.isInteger(Number(input))) {
      return this.onValidationFailure();
    } else {
      return this.onValidationSuccess(input);
    }
  }

  onValidationFailure() {
    this.setState({
      error: "Please enter a valid 5 digit zip code",
      input: ""
    });
  }

  onValidationSuccess(input) {
    const zips = this.props.zips;
    if (zips.includes(input)) {
      return this.onDuplicateEntry();
    }
    this.props.addLocation(input);
    this.setState({ error: null, input: "" });
  }

  onDuplicateEntry() {
    this.setState({ error: "That zip already exists", input: "" });
  }

  render() {
    const { error, input } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={input} />
          <button>Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default Input;
