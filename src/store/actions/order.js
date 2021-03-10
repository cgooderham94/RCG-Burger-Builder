import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, authToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth=' + authToken, orderData)
            .then(response => {
                console.log(response.data);
                console.log(orderData);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }).catch(error => {
                console.log(error);
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (authToken) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        
        axios.get('/orders.json?auth=' + authToken)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
}

export const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrderSuccess = (orders) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orders: orders
    }
}

export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error
    }
}

export const deleteOrder = (orderId) => {
    return dispatch => {
        dispatch(deleteOrderStart());

        console.log(orderId);
    }
}