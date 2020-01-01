import React from 'react'
import classes from './Order.module.css';

export default function Order(props) {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad ({props.order.salad}), Bacon ({props.order.bacon}),  Cheese ({props.order.cheese}), Meat ({props.order.meat}) </p>
      <p>Price: <strong> USD {props.order.price.toFixed(2)} </strong></p>
    </div>
  )
}
