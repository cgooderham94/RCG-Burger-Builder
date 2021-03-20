import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state) => {
    return updateObj(state, {
        purchased: false
    })
}

const purchaseBurgerStart = (state) => {
    return updateObj(state, {
        loading: true
    });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObj(action.orderData, {
        id: action.orderId,
    });
    
    return updateObj(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}

const purchaseBurgerFail = (state) => {
    return updateObj(state, {
        loading: false
    });
}

const fetchOrdersStart = (state) => {
    return updateObj(state, {
        loading: true
    });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObj(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrdersFail = (state) => {
    return updateObj(state, {
        loading: false
    });
}

/* -- ORDERS REDUCER -- */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state);
        default:
            return state;
    }
}

export default reducer;