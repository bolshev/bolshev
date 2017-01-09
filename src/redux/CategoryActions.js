import {CategoryActionTypes} from './ActionTypes';

export function loadCategories() {
    return {
        type: CategoryActionTypes.LOAD_CATEGORIES,
    }
}

export function addCategory(category) {
    return {
        type: CategoryActionTypes.ADD_CATEGORY,
        data: {
            category
        },
    }
}

export function editCategory(id) {
    return {
        type: CategoryActionTypes.EDIT_CATEGORY,
        data: {
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
        data: {
            key: id,
        }
    }
}

export function updateCategory(category) {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY,
        data: {
            category
        },
    }
}

