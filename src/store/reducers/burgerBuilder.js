import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility'; 

const initialState = {
    ingredients: null,
    totalPrice: 3.99,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.8,
    meat: 1.0
}

const addIngredient = (state, action) => {
    const updatedAddIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedAddIngredients = updateObj(state.ingredients, updatedAddIngredient);
    const updatedAddState = {
        ingredients: updatedAddIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }

    return updateObj(state, updatedAddState);
}

const removeIngredient = (state, action) => {
    const updatedRemoveIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedRemoveIngredients = updateObj(state.ingredients, updatedRemoveIngredient);
    const updatedRemoveState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    
    return updateObj(state, updatedRemoveState);
}

const setIngredient = (state, action) => {
    return updateObj(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredient = (state) => {
    return updateObj(state, {
        error: true
    });
}

/* -- BURGER BUILDER REDUCER -- */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            fetchIngredient(state);
        default:
            return state
    }
}

export default reducer;