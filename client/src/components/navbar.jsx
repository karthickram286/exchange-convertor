import React from 'react';
import { Component } from 'react';
import NavIcon from './navicon';
import Cookies from 'js-cookie';

import '../styles/navbar.styles.css';

class Navbar extends Component {

  constructor() {
    super();

    this.state = {
      isUserSignedIn: Cookies.get('authToken') !== undefined ? true : false
    };
  }

  render() {
    if (this.state.isUserSignedIn) {
      return (
        <div className="topnav">
          <NavIcon name="Home" url="/" status="active" />
          <NavIcon name="Logout" url="/logout" status="" />
          <NavIcon name="Convertor" url="/convert" status="" />
        </div>
      );
    } else {
      return (
        <div className="topnav">
          <NavIcon name="Home" url="/" status="active" />
          <NavIcon name="Login" url="/login" status="" />
          <NavIcon name="Register" url="/register" status="" />
        </div>
      );
    }
  }
}

export default Navbar;