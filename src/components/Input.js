import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      input: ''
    };
  }
  onChange(event) {
    this.setState({ input: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    this.props.validateInput(input);
    this.setState({ input: '' });
  }
  render() {
    const { input } = this.state;
    return (
      <div className="input">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <input
              onChange={this.onChange}
              placeholder="Enter a zip..."
              value={input}
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Input;
