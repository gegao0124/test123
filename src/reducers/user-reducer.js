import { UPDATE_DISCOUNTS } from '../actions/user-actions';

export default function userReducer(state = '', 
    { type, payload }) {
    switch(type) {
        case UPDATE_DISCOUNTS :
            return payload.code;
        default: 
            return state;
    }
}