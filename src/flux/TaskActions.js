import TaskActionTypes from './TaskActionTypes';
import TaskDispatcher from './TaskDispatcher';

const TaskActions = {
    loadTasks() {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.LOAD_TASKS,
        });
    },

    addTask(task) {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.ADD_TASK,
            data: {
                task
            },
        });
    },

    editTask(id) {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.EDIT_TASK,
            data: {
                key: id
            },
        });
    },

    cancelEditTask() {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.CANCEL_EDIT_TASK,
        });
    },

    toggleTask(id, isDone) {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.TOGGLE_TASK,
            data: {
                key: id,
                isDone: isDone
            }
        });
    },

    updateTask(task) {
        if (!task.key) {
            this.addTask(task);
        } else {
            TaskDispatcher.dispatch({
                type: TaskActionTypes.UPDATE_TASK,
                data: {
                    task
                },
            });
        }
    },
};

export default TaskActions;
