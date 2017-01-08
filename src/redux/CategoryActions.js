import CategoryActionTypes from './CategoryActionTypes';

const CategoryActions = {
    loadTasks() {
        return {
            type: CategoryActionTypes.LOAD_CATEGORIES,
        }
    },

    addTask(task) {
        return {
            type: CategoryActionTypes.ADD_CATEGORY,
            data: {
                task
            },
        }
    },

    editTask(id) {
        return {
            type: CategoryActionTypes.EDIT_CATEGORY,
            data: {
                key: id
            },
        }
    },

    cancelEditTask() {
        return {
            type: CategoryActionTypes.CANCEL_EDIT_CATEGORY,
        }
    },

    toggleTask(id, isDone) {
        return {
            type: CategoryActionTypes.TOGGLE_CATEGORY,
            data: {
                key: id,
                isDone: isDone
            }
        }
    },

    updateTask(task) {
        if (!task.key) {
            return this.addTask(task);
        } else {
            return {
                type: CategoryActionTypes.UPDATE_CATEGORY,
                data: {
                    task
                },
            }
        }
    },
};

export default CategoryActions;
