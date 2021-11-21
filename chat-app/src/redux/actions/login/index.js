import { SET_LOGIN, RESET_LOGIN } from '../../types';

export function doSetLogin(payload) {
    return {
        type: SET_LOGIN,
        login: payload,
    };
}

export function doResetLogin() {
    return {
        type: RESET_LOGIN
    };
}