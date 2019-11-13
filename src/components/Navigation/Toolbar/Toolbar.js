import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import MenuButton from '../MenuButton/MenuButton'

import Navigationitems from '../../Navigation/Navigationitems/Navigationitems';

function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <MenuButton clicked={props.openCloseHandler}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <Navigationitems></Navigationitems>
      </nav>
    </header>
  )
}

export default Toolbar;
