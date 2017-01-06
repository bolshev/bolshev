import React, {Component} from 'react';
import './Task.css';
import {browserHistory as history} from 'react-router';

class Task extends Component {
    constructor(props) {
        super(props);
        this.onClick = props.onClick;
        this.state = props.data;
    }

    handleChangeChecked() {
        console.log("Task:handleChangeChecked");
        let state = this.state;
        state.isDone = !this.state.isDone;
        this.setState(state);
    }

    handleEditClick() {
        console.log("Task:handleEditClick");
        history.push('/task/' + this.state.key)
    }

    render() {
        return (
            <div className="Task">
                <div className="Task-content">
                    <input onChange={this.handleChangeChecked.bind(this)} type="checkbox" checked={this.state.isDone}/>
                    <span className="Task-title">{this.state.title}</span>
                    <button onClick={this.handleEditClick.bind(this)}>Edit</button>
                </div>
            </div>
        );
    }
}

export default Task;
