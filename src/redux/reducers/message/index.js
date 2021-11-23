import { SET_MESSAGE, RESET_MESSAGE } from "../../types";

const INITIAL_STATE = {
    user: ''
}

export default function Message(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                ...action.message
            };
        case RESET_MESSAGE:
            return {
                INITIAL_STATE,
            };
        default:
            return state;
    }
}