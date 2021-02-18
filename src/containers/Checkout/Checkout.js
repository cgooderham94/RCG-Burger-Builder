import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Details from './Details/Details';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/details');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler}/>

                <Route 
                    path={this.props.match.url + '/details'} 
                    component={Details} />)} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);