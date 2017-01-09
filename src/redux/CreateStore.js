import {createStore, applyMiddleware} from 'redux';
import RootReducer from '../redux/RootReducer';
import {testMiddleware} from '../redux/Middleware';

export default function configureStore(initialState) {
    return createStore(RootReducer, initialState, applyMiddleware(testMiddleware));
}