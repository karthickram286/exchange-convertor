import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

class HomePage extends React.Component {

  constructor() {
    super();

    this.state = {
      isUserSignedIn: Cookies.get('authToken') !== undefined ? true : false
    };
  }

  render() {
    if (this.state.isUserSignedIn) {
      return (
        <div className="home">
          <h2>Welcome to Exchange Convertor</h2> <br />

          <h5>Howdy! User...</h5>
        </div>
      )
    } else {
      return (
        <div className="home">
          <h2>Welcome to Exchange Convertor</h2> <br />

          <h5>Please login to continue</h5>
        </div>
      )
    }
  }
}

export default withRouter(HomePage);