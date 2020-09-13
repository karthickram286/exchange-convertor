import React from 'react';
import axios from 'axios';
import { Button, Badge, FormGroup, FormControl, FormLabel, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import '../styles/exchange-convertor.styles.css';

class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      status: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      status: ''
    });
  }

  handleClick = event => {
    this.setState({
      [event.target.id]: event.target.checked,
      status: ''
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    try {
      await axios.post('/v1/users/add', user);
      this.setState({
        status: 'Registered successfully'
      });
    } catch (error) {
      this.setState({
        status: `Registration failed: ${error.response.data}`
      });
    }
  }

  validateForm() {
    return (this.state.username.length > 3)
      && (this.state.password.length > 5)
      && (this.state.confirmpassword.length > 5)
      && (this.state.password === this.state.confirmpassword);
  }

  render() {
    return (
      <div>
        <div className="register">

          <h2>
            User Registeration
          </h2> <br />

          <div className="registeralert">
            <ListGroup as="ul">
              <ListGroup.Item as="li" disabled>
                Username should be atleast 4 characters
              </ListGroup.Item>
              <ListGroup.Item as="li" disabled>
                Password should be atleast 6 characters
              </ListGroup.Item>
              <ListGroup.Item as="li" disabled>
                Password and Confirm password should match
              </ListGroup.Item>
            </ListGroup>
          </div> <br />

          <form onSubmit={this.handleSubmit}>

            <FormGroup controlId="username">
              <FormLabel color="blue">Username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup controlId="password">
              <FormLabel color="blue">Password</FormLabel>
              <FormControl
                autoFocus
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup controlId="confirmpassword">
              <FormLabel color="blue">Confirm Password</FormLabel>
              <FormControl
                autoFocus
                type="password"
                value={this.state.confirmpassword}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup>
              <center><Badge variant="info">{this.state.status}</Badge></center>
            </FormGroup>

            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
            >
              Register
            </Button>
          </form>

        </div>
      </div>
    );
  }
}

export default withRouter(Register);