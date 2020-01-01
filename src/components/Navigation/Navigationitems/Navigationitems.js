import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

export default function Navigationitems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <Navigationitem link="/" exact> Burger Builder </Navigationitem>
      <Navigationitem link="/orders" > Orders </Navigationitem>
    </ul>
  )
}
  