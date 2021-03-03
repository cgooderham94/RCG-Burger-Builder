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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
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
        type: actionTypes.PUCHASE_INIT
    }
}