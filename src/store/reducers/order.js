import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../store/utility';

const initialState = {
    order: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return updateObj(state, {
                loading: true
            });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObj(action.orderData, {
                id: action.orderId
            });
            
            return updateObj(state, {
                loading: false,
                order: state.orders.concat(newOrder)
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObj(state, {
                loading: false
            });
        default:
            return state;
    }
}

export default reducer;