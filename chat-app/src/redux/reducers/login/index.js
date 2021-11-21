import { SET_LOGIN, RESET_LOGIN } from '../../types';

const INITIAL_STATE = {
    userName: '',
    key: '',
}

export default function Login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                ...action.login
            };
        case RESET_LOGIN:
            return {
                INITIAL_STATE,
            };
        default:
            return state;
    }
}