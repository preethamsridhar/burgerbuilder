import React from 'react'
import MenuIcon from '../../../assets/images/MenuIcon.png';
import classes from './MenuItem.module.css'

export default function MenuButton(props) {
  return (
    <div className={classes.Menu} onClick={props.clicked} >
      <img src={MenuIcon} alt="Menu"></img>
    </div>
  )
}
