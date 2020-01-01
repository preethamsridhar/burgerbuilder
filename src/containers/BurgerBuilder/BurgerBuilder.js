import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import instance from '../../axios-order';
import 'antd/dist/antd.css';
import {Spin} from 'antd';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
      ingredients: null,
      totalPrice: 4.0,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

  updatePurchaseState() {
    // updatePurchaseState(ingredients) {
    console.log("update purchase state", this.state);
    const ingredients = {
      ...this.state.ingredients
    }
    if(this.state.ingredients){
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
    }, () => this.updatePurchaseState());
    // this.updatePurchaseState(currentIngredients);
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
    }, () => this.updatePurchaseState());
    // this.updatePurchaseState(currentIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    let queryParams = [];
    console.log(this.state.ingredients);
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    console.log("queryString: ",queryString)
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  
  componentDidMount() {
    instance.get('https://react-my-burger-5b1d7.firebaseio.com/ingredients.json')
      .then(response => {
        console.log("component did mount: ", response);
        this.setState({
          ingredients: response.data
        })
      })
      .catch(err=>{
        console.log(err); 
        this.setState({
          error: true
        })
      })
  }

  render() {
    const disableInfo = {...this.state.ingredients}
    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = this.state.error ? 
    (<p> Ingredients cannot be loaded !!!</p>):
    (
      <Aux>
        <Spin 
          spinning={true}
          size="small" 
        >
        </Spin>
      </Aux>
    );

    let orderSummary = null;
    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            addIngredients={this.addIngredientHandler}
            removeIngredients={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary 
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice}
            />
      )
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <Spin spinning={this.state.loading} size="large">
            {orderSummary}
          </Spin>
        </Modal>
        { burger }
      </Aux>
    )
  }

  componentWillUnmount() {
    console.log("[burgerBuilder.js] componentWillUnmount");
  }
} 

export default withErrorHandler(BurgerBuilder, instance);