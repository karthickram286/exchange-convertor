import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Convertor from './components/convertor';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" component = { Homepage } />
        <Route exact path="/register" component = { Register } />
        <Route exact path="/login" component = { Login } />
        <Route exact path="/logout" component = { Logout } />
        <Route exact path="/convert" component = { Convertor } />
      </Switch>

      <Footer content="© 2020 Copyright: karthickram.in"/>
    </div>
  );
}

export default App;
