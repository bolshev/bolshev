import React, {Component} from 'react';
import './Task.css';
import Server from './Server';
import {browserHistory as history} from 'react-router';

class Task extends Component {
    constructor(props) {
        super(props);
        this.server = new Server();
        this.showDone = props.filter.showDone;
        this.state = props.data;
    }

    handleChangeChecked(e) {
        console.log("Task:handleChangeChecked");
        let state = this.state;
        state.isDone = e.target.checked;
        this.server.updateTask(state);
        this.setState(state);
        this.props.taskCompleteClick(this.state);
    }

    handleEditClick() {
        console.log("Task:handleEditClick");
        history.push('/task/' + this.state.key)
    }

    render() {
        if ((!this.props.filter.showDone && this.state.isDone) || this.state.title.indexOf(this.props.filter.fText) === -1) {
            return (null);
        } else {
            return (
                <div className="Task">
                    <div className="Task-content">
                        <input onChange={this.handleChangeChecked.bind(this)} type="checkbox"
                               checked={this.state.isDone}/>
                        <span className="Task-title">{this.state.title}</span>
                        <button onClick={this.handleEditClick.bind(this)}>Edit</button>
                    </div>
                </div>
            );
        }
    }
}

export default Task;
