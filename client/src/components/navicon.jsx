import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/navicon.styles.css';

const NavIcon = (props) => {

  let url = props.url.toLowerCase();
  
  return (
    <Link className={`${props.status}`} to={url}>{props.name}</Link>
  );

}

export default NavIcon;