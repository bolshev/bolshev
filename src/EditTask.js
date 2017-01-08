import React, {Component} from 'react';
import {browserHistory as history} from 'react-router';
import './css/Task.css';
import Server from './Server';
import TaskStore from './flux/TaskStore';
import TaskActions from './flux/Actions';
import SelectCategory from './SelectCategory';
import History from './History';

class EditTask extends Component {
    componentWillMount() {
        let data = {};
        data.categories = Server.getAllCategories();
        if (this.props.routeParams.taskKey) {
            data.task = TaskStore.getTask(this.props.routeParams.taskKey);
        } else {
            data.task = {title: this.props.location.query.taskName || "New task"};
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
            TaskActions.updateTask(this.state.task);
            history.push("/");
        }
    }

    handleCancelClick() {
        console.log("EditTask:handleCancelClick");
        TaskActions.cancelEditTask();
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
                <History/>
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
