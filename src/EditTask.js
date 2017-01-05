import React, {Component} from 'react';
import {browserHistory as history} from 'react-router';
import './Task.css';
import Server from './Server';
import Category from './Category';

class EditTask extends Component {
    componentWillMount() {
        this.server = new Server();
        let data = {};
        data.task = this.server.getTaskByKey(this.props.routeParams.taskKey);
        data.categories = this.server.getAllCategories();
        data.editTask = true;

        this.setState(data);
        this.category = this.server.getCategoryByKey(data.task.categoryKey);
    }

    handleChangeChecked() {
        console.log("handleChangeChecked");
        let state = this.state;
        state.task.isDone = !this.state.task.isDone;
        this.setState(state);
    }

    handleChangeInput(e) {
        console.log("handleChangeChecked");
        let state = this.state;
        state.task.title = e.target.value;
        this.setState(state);
    }

    handleSaveClick() {
        console.log("handleSaveClick");
        this.server.addTaskToCategory(this.state.task, this.state.task.categoryKey, this.category.key);
        history.push("/");
    }

    handleCancelClick() {
        console.log("handleCancelClick");
        history.push("/");
    }

    handleCategorySelect(category) {
        console.log("handleCategorySelect");
        let state = this.state;
        this.category = category;
        this.setState(state);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Edit {this.state.task.title}</h2>
                </div>
                <div className="App-content">
                    <div className="App-categories">
                        {this.state.categories.map((elem) => <TaskCategory isEdit={this.state.editTask}
                                                                       onSelect={this.handleCategorySelect.bind(this)}
                                                                       key={elem.key}
                                                                       data={elem}/>)}
                    </div>
                    <div className="App-tasks">
                        <div className="Task">
                            <div className="Task-buttons-right">
                                <button onClick={this.handleSaveClick.bind(this)}>Save changes</button>
                                <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
                            </div>
                            <div>
                                <input type="text" onChange={this.handleChangeInput.bind(this)}
                                       value={this.state.task.title}/>
                            </div>
                            <div>
                                <input type="checkbox" onChange={this.handleChangeChecked.bind(this)}
                                       checked={this.state.task.isDone}/>
                                Done
                            </div>
                            <div>
                                <textarea rows="30" value="Description"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTask;
