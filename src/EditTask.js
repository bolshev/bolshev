import React, {Component} from 'react';
import {browserHistory as history} from 'react-router';
import './Task.css';
import Server from './Server';
import SelectCategory from './SelectCategory';

class EditTask extends Component {
    componentWillMount() {
        this.server = new Server();
        let data = {};
        data.categories = this.server.getAllCategoriesWithTasks();
        if (this.props.routeParams.taskKey) {
            data.task = this.server.getTaskByKey(this.props.routeParams.taskKey);
        } else {
            data.task = {title: "New task"};
        }

        this.setState(data);
    }

    handleChangeChecked() {
        console.log("EditTask:handleChangeChecked");
        let state = this.state;
        state.task.isDone = !this.state.task.isDone;
        this.setState(state);
    }

    handleChangeTitle(e) {
        console.log("EditTask:handleChangeTitle");
        let state = this.state;
        state.task.title = e.target.value;
        this.setState(state);
    }

    handleChangeDesc(e) {
        console.log("EditTask:handleChangeDesc");
        let state = this.state;
        state.task.description = e.target.value;
        this.setState(state);
    }

    handleSaveClick() {
        console.log("EditTask:handleSaveClick");
        if (!this.state.task.categoryKey) {
            alert('Please select a category?')
        } else {
            this.server.updateTask(this.state.task);
            history.push("/");
        }
    }

    handleCancelClick() {
        console.log("EditTask:handleCancelClick");
        history.push("/");
    }

    handleCategorySelect(category) {
        console.log("EditTask:handleCategorySelect");
        let state = this.state;
        state.task.categoryKey = category.key;
        this.setState(state);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Edit {this.state.task.title}</h2>
                </div>
                <div className="App-content">
                    <div className="App-categories">
                        {this.state.categories.map((elem) => <SelectCategory selectedKey={this.state.task.categoryKey}
                                                                             handleCategorySelect={this.handleCategorySelect.bind(this)}
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
                                <input type="text" onChange={this.handleChangeTitle.bind(this)}
                                       value={this.state.task.title || "New task"}/>
                            </div>
                            <div>
                                <input type="checkbox" onChange={this.handleChangeChecked.bind(this)}
                                       checked={this.state.task.isDone || false}/>
                                Done
                            </div>
                            <div>
                                <textarea rows="30" value={this.state.task.description || "Description"}
                                          onChange={this.handleChangeDesc.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTask;
