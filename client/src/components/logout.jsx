import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, FormGroup, Badge } from 'react-bootstrap';

import '../styles/exchange-convertor.styles.css';

class Logout extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "",
      redirect: false
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

    Cookies.remove('authToken');
    localStorage.removeItem('userId');

    this.setState({
      status: 'Sucessfully logged out'
    })

    // Refresh page after 1 second
    setTimeout(() => { 
      window.location.reload(); 
    }, 1000);

    // Redirecting to home
    this.setState({
      redirect: true
    })
  }

  render() {

    let redirectToHome = this.state.redirect;
    if (redirectToHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className="logout">
          <h2>Do you really want to logout?</h2> <br />
        </div>

        <FormGroup>
              <center><Badge variant="info">{this.state.status}</Badge></center>
        </FormGroup>

        <form onSubmit={this.handleSubmit}>
          <Button
            style={{marginRight: 15}} 
            className="btn btn-danger"
            type="submit"
          >
            Logout
        </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Logout);