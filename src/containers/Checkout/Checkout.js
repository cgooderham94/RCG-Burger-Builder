import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Details from './Details/Details';

const Checkout = props => {
    let summary = <Redirect to="/"/>

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/details');
    }

    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;

        summary = (
            <div>
                { purchaseRedirect }

                <CheckoutSummary 
                    ingredients={props.ings} 
                    checkoutCancelled={checkoutCancelledHandler} 
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route 
                    path={props.match.url + '/details'} 
                    component={Details} />
            </div>
        )
    }

    return (
        <div>
            { summary }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);