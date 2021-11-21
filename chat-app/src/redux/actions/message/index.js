import { SET_MESSAGE, RESET_MESSAGE } from "../../types";

export function doSetMessage(payload) {
    return {
        type: SET_MESSAGE,
        message: payload
    };
}

export function doResetMessage() {
    return {
        type: RESET_MESSAGE,
    }
}