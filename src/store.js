import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension';
// import { compose } from 'compose';
import thunk from 'redux-thunk';
import chatReducer from './containers/Chat/reducer';
import userReducer from './containers/Home/reducer';

const rootReducer = combineReducers({chat: chatReducer, currentUser: userReducer});

const initialState = {};

const middlewares = [thunk];

const store = createStore(rootReducer ,initialState, compose(applyMiddleware(...middlewares)));

export default store;