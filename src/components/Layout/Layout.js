import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSideDrawer: false
    }
  }

  sideDrawerClosedHandler = () => {
    this.setState((prevState, prevProps) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }


  render() {
    return (
      <Aux>
        <Toolbar openCloseHandler={this.sideDrawerClosedHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;