import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.8,
    meat: 1.0
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3.99,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get("https://rcg---burger-builder.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        // Grab the old quantity of the ingredient
        const oldCount = this.state.ingredients[type];
        // Increment it
        const updatedCount = oldCount + 1;

        // Make a new ingredients object from the current state
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // Update the quantity of the ingredient
        updatedIngredients[type] = updatedCount;

        // Add the price of the added ingredient to the total price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Update the state
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // Grab the old quantity of the ingredient
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        // Increment it
        const updatedCount = oldCount - 1;

        // Make a new ingredients object from the current state
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // Update the quantity of the ingredient
        updatedIngredients[type] = updatedCount;

        // Add the price of the added ingredient to the total price
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        // Update the state
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You can continue');

        // this.setState({loading: true});

        // let order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Charlie',
        //         address: '1 The Street',
        //         postCode: 'AA11 BBB',
        //         country: 'United Kingdom',
        //         email: 'cgooderham94@gmail.com'
        //     },
        //     deliveryMethod: 'UBER Eats'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     }).catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Damn... we can't fetch any ingredients!</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                totalPrice={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />;

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disableInfo}
                                purchasable={this.state.purchasable}
                                totalPrice={this.state.totalPrice} 
                                ordered={this.purchaseHandler}/>
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);