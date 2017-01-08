import EventEmitter from 'event-emitter';
import Server from '../Server';
import TaskActionTypes from './TaskActionTypes';
import TaskDispatcher from './TaskDispatcher';
import {browserHistory as history} from 'react-router';

const TaskStore = {
    constructor() {
        this._ee = new EventEmitter({});
        this._tasks = {};

        TaskDispatcher.register(function (action) {
            switch (action.type) {
                case TaskActionTypes.LOAD_TASKS:
                    this.fetchTasks();
                    this._ee.emit('change');
                    return;
                case TaskActionTypes.ADD_TASK:
                    this.updateTask(action.data.task);
                    this._ee.emit('change');
                    return;
                case TaskActionTypes.CANCEL_EDIT_TASK:
                    history.push('/');
                    return;
                case TaskActionTypes.EDIT_TASK:
                    history.push('/task/' + action.data.key);
                    return;
                case TaskActionTypes.TOGGLE_TASK:
                    this.toggleTask(action.data.key, action.data.isDone);
                    this._ee.emit('change');
                    return;
                case TaskActionTypes.UPDATE_TASK:
                    this.updateTask(action.data.task);
                    this._ee.emit('change');
                    return;
                default:
                    return;
            }
        }.bind(this));
    },

    fetchTasks() {
        this._tasks = Server.getAllData().tasks;
    },

    toggleTask(key, isDone) {
        let task = this.getTask(key);
        task.isDone = isDone;
        Server.updateTask(task);
    },

    updateTask(task) {
        Server.updateTask(task);
    },

    getTask(id) {
        this.fetchTasks();
        return this._tasks[id];
    },

    getTasks() {
        this.fetchTasks();
        return this._tasks;
    },

    subscribe(cb) {
        this._ee.on('change', cb);
    },

    unsubscribe(cb) {
        this._ee.off('change', cb);
    },

    dispatchRegister(context) {

    }
};

TaskStore.constructor();

export default TaskStore;
