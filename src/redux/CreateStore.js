import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import RootReducer from '../redux/RootReducer';
import {testMiddleware} from '../redux/Middleware';

export default function configureStore(initialState) {
    return createStore(RootReducer, initialState, applyMiddleware(promiseMiddleware, testMiddleware));
}