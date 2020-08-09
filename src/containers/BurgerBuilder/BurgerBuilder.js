import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.8,
    meat: 1.0
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 3.99
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
        })
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
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>

                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disableInfo}
                               totalPrice={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;