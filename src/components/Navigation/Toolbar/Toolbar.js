import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

import Navigationitems from '../../Navigation/Navigationitems/Navigationitems';

function Toolbar() {
  return (
    <header className={classes.Toolbar}>
      <div>
        Menu
      </div>
      <Logo></Logo>
      <nav>
        <Navigationitems></Navigationitems>
      </nav>
    </header>
  )
}

export default Toolbar;
