import React, {Component} from 'react';
import './Task.css';

class EditTask extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = props.data;
    }

    handleChangeChecked() {
        console.log("handleChangeChecked");
        let state = this.state;
        state.isDone = !this.state.isDone;
        this.setState(state);
    }

    render() {
        return (
            <div className="Task">
                <div className="Task-buttons-right">
                    <button onClick={this.props.onClick}>Save changes</button>
                    <button onClick={this.props.onClick}>Cancel</button>
                </div>
                <div>
                    <input type="text" value={this.state.title}/>
                </div>
                <div>
                    <input type="checkbox" onChange={this.handleChangeChecked.bind(this)} value={this.state.isDone}/>
                    Done
                </div>
                <div>
                    <textarea rows="30" value="Description" />
                </div>
            </div>
        );
    }
}

export default EditTask;
