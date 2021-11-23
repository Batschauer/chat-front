import { combineReducers } from 'redux';
import Login from './login';
import Message from './message';

const rootReducer = combineReducers({
    login: Login,
    message: Message,
});

export default rootReducer;