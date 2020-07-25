import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './index.saga';
// import { compose } from 'compose';
import chatReducer from '../containers/Chat/reducer';
import userReducer from '../containers/Admin/reducer';
import loginReducer from '../containers/Login/reducer';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({chat: chatReducer, currentUser: loginReducer, users: userReducer });

const initialState = {};

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer ,initialState, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;