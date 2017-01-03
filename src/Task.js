import React, {Component} from 'react';
import './Task.css';

class Task extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.onClick = props.onClick;
        this.state = props.data;
    }

    handleChangeChecked() {
        console.log("handleChangeChecked");
        let state = this.state;
        state.isDone = !this.state.isDone;
        this.setState(state);
    }

    handleEditClick() {
        console.log("handleEditClick");
        this.onClick(this.state);
    }

    render() {
        return (
            <div className="Task">
                <div className="Task-content">
                    <input onChange={this.handleChangeChecked.bind(this)} type="checkbox" checked={this.state.isDone}/>
                    <span className="Task-title">{this.state.title}</span>
                    <button onClick={this.handleEditClick.bind(this)}>E</button>
                </div>
            </div>
        );
    }
}

export default Task;
