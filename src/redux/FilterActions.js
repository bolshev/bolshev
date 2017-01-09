import {FilterActionTypes} from './ActionTypes';

export function loadFilters(query) {
    return {
        type: FilterActionTypes.LOAD_FILTERS,
        data: {
            query: query
        }
    }
}

export function saveFilters(filters, isReplace) {
    return {
        type: FilterActionTypes.SAVE_FILTERS,
        data: {
            filters: filters,
            isReplace: isReplace
        },
    }
}

export function updateQuery(filters) {
    return {
        type: FilterActionTypes.UPDATE_QUERY,
        data: {
            filters: filters,
            isReplace: true
        },
    }
}

export function selectCategory(categoryKey, flag) {
    return {
        type: FilterActionTypes.SELECT_CATEGORY,
        data: {
            key: categoryKey,
            flag: flag
        },
    }
}

export function getQuery() {
    return {
        type: FilterActionTypes.GET_QUERY,
    }
}

