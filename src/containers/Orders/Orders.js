import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount = () => {
        this.props.onFetchOrders();
    }

    onDeleteHandler = () => {
        console.log('Deleting!');
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = 
                this.props.orders.map(order => 
                    <Order 
                        key={order.id} 
                        orderId={order.id}
                        ingredients={order.ingredients} 
                        price={order.price} 
                        delete={() => this.onDeleteHandler}/>
                )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
        // onDeleteOrder: (orderId) => console.log(orderId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);