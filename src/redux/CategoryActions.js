import {CategoryActionTypes} from './ActionTypes';
import Server from '../Server'

export function loadCategories(withTasks) {
    return {
        type: CategoryActionTypes.LOAD_CATEGORIES,
        payload: Server.getAllCategoriesPromise(withTasks),
    }
}

export function addCategory(category) {
    return {
        type: CategoryActionTypes.ADD_CATEGORY,
        payload: {
            category
        },
    }
}

export function editCategory(id) {
    return {
        type: CategoryActionTypes.EDIT_CATEGORY,
        payload: {
            key: id
        },
    }
}

export function cancelEditCategory() {
    return {
        type: CategoryActionTypes.CANCEL_EDIT_CATEGORY,
    }
}

export function deleteCategory(id) {
    return {
        type: CategoryActionTypes.DELETE_CATEGORY,
        payload: {
            key: id,
        }
    }
}

export function updateCategory(category) {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY,
        payload: {
            category
        },
    }
}

export function updateCategoryFinished(withTasks) {
    return {
        type: CategoryActionTypes.LOAD_CATEGORIES_FINISHED,
        payload: {
            withTasks
        },
    }
}

