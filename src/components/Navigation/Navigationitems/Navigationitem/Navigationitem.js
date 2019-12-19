import React from 'react'
import classes from './Navigationitem.module.css';

export default function Navigationitem(props) {
  console.log("[NavigationItem.js]");
  console.log("props: ", props);
  return (
    <li className={classes.NavigationItem}>
      <a 
        href={props.link} 
        className={props.active ? classes.active : null}
      >
        {props.children}
      </a>
    </li>
  )
}
