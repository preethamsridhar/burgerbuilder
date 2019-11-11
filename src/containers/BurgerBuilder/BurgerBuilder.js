import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4.0,
      purchasable: false
    }
  }

  updatePurchaseState(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients
    // }
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, value) => {
        return sum + value;
      }, 0)
      this.setState({
        purchasable: sum > 0
      })
  }

  addIngredientHandler = (type) => {
    console.log(type, this.state.ingredients[type])
    let updatedIng = this.state.ingredients[type] + 1;
    let currentIngredients = {...this.state.ingredients}
    currentIngredients[type] = updatedIng
    let updatedTotalPrice = this.state.totalPrice;
    updatedTotalPrice += INGREDIENT_PRICES[type];
    console.log('[BurgerBuilder.js] updated ingredients add : ', currentIngredients);
    this.setState({
      ingredients: currentIngredients,
      totalPrice: updatedTotalPrice
    })
    this.updatePurchaseState(currentIngredients);
  }

  removeIngredientHandler = (type) => {
    console.log(type, this.state.ingredients[type]);
    let updatedIng = this.state.ingredients[type];
    if (this.state.ingredients[type] > 0) {
      updatedIng -=  1;
    }
    let currentIngredients = {...this.state.ingredients}
    currentIngredients[type] = updatedIng
    let updatedTotalPrice = this.state.totalPrice;
    updatedTotalPrice -= INGREDIENT_PRICES[type];
    console.log('[BurgerBuilder.js] updated ingredients remove: ', currentIngredients);
    this.setState({
      ingredients: currentIngredients,
      totalPrice: updatedTotalPrice
    })
    this.updatePurchaseState(currentIngredients);
  }

  render() {
    const disableInfo = {...this.state.ingredients}
    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          addIngredients={this.addIngredientHandler}
          removeIngredients={this.removeIngredientHandler}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
} 

export default BurgerBuilder;