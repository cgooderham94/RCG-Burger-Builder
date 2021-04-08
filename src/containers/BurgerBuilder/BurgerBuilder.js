import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const { onInitIngredients } = props;
    const disableInfo = {
        ...props.ings
    };
    let orderSummary = null;
    let burger = props.error ? <p style={{textAlign: 'center'}}>Damn... we can't fetch any ingredients!</p> : <Spinner />;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');

            props.history.push('/login');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    if ( props.ings ) {
        orderSummary = <OrderSummary 
            totalPrice={props.totalPrice}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            ingredients={props.ings} />;

        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls ingredientAdded={props.onIngredientAdded}
                            ingredientRemoved={props.onIngredientRemoved}
                            disabled={disableInfo}
                            purchasable={updatePurchaseState(props.ings)}
                            totalPrice={props.totalPrice} 
                            ordered={purchaseHandler} 
                            isAuthenticated={props.isAuthenticated} />
            </Aux>
        );
    }

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>

            { burger }
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));