import {combineReducers} from 'redux';
import Server from '../Server'
import {CategoryActionTypes, FilterActionTypes} from './CategoryActionTypes'

const initialStateCategories = Server.getAllCategories();

// ??? query
const initialStateFilters = Server.loadFilter();

function reducerCategories(state = initialStateCategories, action) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY:
            return action.filter;
        default:
            return state;
    }
}

function reducerFilters(state = initialStateFilters, action) {
    switch (action.type) {
        case FilterActionTypes.LOAD_FILTER:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case FilterActionTypes.GET_QUERY:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo;
            });
        case FilterActionTypes.SAVE_FILTER:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo;
            });
        default:
            return state
    }
}

const RootReducer = combineReducers({
    categories: reducerCategories,
    filters: reducerFilters
});

export default RootReducer