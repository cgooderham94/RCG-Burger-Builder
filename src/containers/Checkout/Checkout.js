import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Details from './Details/Details';
import * as action from '../../store/actions/order';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/details');
    }

    render() {
        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <div>
                    {purchaseRedirect}

                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler} 
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.url + '/details'} 
                        component={Details} />
                </div>
            )
        }

        return (
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);