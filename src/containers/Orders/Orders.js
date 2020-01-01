import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-order';

export class Orders extends Component {
  state = {
    orders : [],
    loading: true
  }
  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const orderList = [];
        for( let key in response.data) {
          orderList.push({
            ...response.data[key].ingredients,
            id: key,
            price: +response.data[key].price
          });
        }
        this.setState({loading: false, orders: orderList})
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false})
      })
  }

  render() {
    return (
      <div>
        {
          this.state.orders.map(order=> (
            <Order key={order.id} order={order}/>
          ))
        }
      </div>
    )
  }
}

export default Orders;
