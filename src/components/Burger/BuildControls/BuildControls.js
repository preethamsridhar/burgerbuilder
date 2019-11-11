import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Bacon', type:'bacon'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Meat', type:'meat'},
]

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => {
      return (
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label} 
          addIng={() => props.addIngredients(ctrl.type)}
          removeIng={()=>props.removeIngredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      );
    })}
    <button 
      className={classes.OrderButton}
      onClick={props.ordered}
      disabled={!props.purchasable}>
        CHECKOUT
    </button>
  </div>
);

export default BuildControls;