import {combineReducers} from 'redux';
import Server from '../Server'
import {CategoryActionTypes, FilterActionTypes} from './ActionTypes'
import {parse as queryParse} from 'query-string';

const initialStateCategories = [];

const initialStateFilters = Server.loadFilter(queryParse(location.search));

function reducerCategories(categories = initialStateCategories, action) {
    switch (action.type) {
        case CategoryActionTypes.LOAD_CATEGORIES:
            return Server.getAllCategories(action.payload.withTasks);
        case CategoryActionTypes.ADD_CATEGORY:
            return Server.updateCategory(action.payload.category);
        case CategoryActionTypes.CANCEL_EDIT_CATEGORY:
            return categories;
        case CategoryActionTypes.DELETE_CATEGORY:
            return Server.deleteCategory(action.payload.key);
        case CategoryActionTypes.EDIT_CATEGORY:
            return categories;
        case CategoryActionTypes.UPDATE_CATEGORY:
            return Server.updateCategory(action.payload.category);
        case CategoryActionTypes.LOAD_CATEGORIES_FINISHED:
            return Server.getAllCategories(action.payload.withTasks);
        default:
            return categories;
    }
}

function reducerFilters(filters = initialStateFilters, action) {
    switch (action.type) {
        case FilterActionTypes.LOAD_FILTERS:
            return Server.loadFilter(queryParse(location.search));
        case FilterActionTypes.GET_QUERY:
            return Server.getFilters();
        case FilterActionTypes.SELECT_CATEGORY:
            if (action.data.flag) {
                filters.selectedCategories.push(action.data.key);
            } else {
                let index = filters.selectedCategories.indexOf(action.data.key);
                if (index > -1) {
                    filters.selectedCategories.splice(index, 1);
                }
            }
            Server.saveFilters(filters);

            return filters;
        case FilterActionTypes.UPDATE_QUERY:
        case FilterActionTypes.SAVE_FILTERS:
            Server.saveFilters(action.data.filters, action.data.isReplace);
            return Server.loadFilter();
        default:
            return filters;
    }
}

const RootReducer = combineReducers({
    categories: reducerCategories,
    filters: reducerFilters
});

export default RootReducer