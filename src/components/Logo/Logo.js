import React from 'react'
import burger from '../../assets/images/burgerIcon.png'
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={burger} alt="my burger"></img>
    </div>
  )
}

export default Logo;