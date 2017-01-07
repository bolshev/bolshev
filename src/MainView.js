import React from 'react';
import Progress from 'react-progressbar';
import './App.css';
import './Category.css';
import './Task.css';
import Server from './Server';
import Category from './Category';
import Task from './Task';
import {browserHistory as history} from 'react-router';

class MainView extends React.Component {
    componentWillMount() {
        this.server = new Server();
        let data = {categories: this.server.getAllCategoriesWithTasks()};

        data.tasks = [];
        data.progress = this.server.getProgress();
        this.setState(data);
    }

    handleSelectCategory(category, flag) {
        console.log("MainView:handleSelectCategory");
        let state = this.state;

        state.tasks = [];
        state.categories.forEach((elem) => {
            state.tasks = state.tasks.concat(this.checkChildren(elem, category, flag));
        });
        this.setState(state);
        this.server.updateCategory(category)
    }

    checkChildren(elem, element, flag) {
        let tasks = [];
        if (elem.key === element.key) {
            elem.selected = flag;
        }

        if (elem.selected) {
            tasks = tasks.concat(elem.tasks);
        }

        if (elem.children) {
            elem.children.forEach((elem) => {
                tasks = tasks.concat(this.checkChildren(elem, element, flag));
            });
        }

        return tasks;
    }

    handleTaskCompleteClick(task) {
        console.log("MainView:handleTaskCompleteClick");
        let state = this.state;
        state.progress = this.server.getProgress();
        this.setState(state);
    }

    handleAddTaskClick() {
        console.log("MainView:handleAddTaskClick");
        history.push("/task/");
    }

    handleAddCategoryClick() {
        console.log("MainView:handleAddTaskClick");
        this.server.updateCategory({title: this.newCategoryName.value});
        this.handleUpdateList();
    }

    handleUpdateList() {
        console.log("MainView:handleUpdateList");
        let state = this.state;
        state.categories = this.server.getAllCategoriesWithTasks();
        this.setState(state);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>TO-DO List</h2>
                </div>
                <div className="App-progress">
                    <Progress completed={this.state.progress}/>
                </div>
                <div className="App-content">
                    <div className="App-categories">
                        <div className="Category-new">
                            <input type="text" ref={(input) => { this.newCategoryName = input; }} placeholder="Enter category title"/>
                            <button onClick={this.handleAddCategoryClick.bind(this)}>Add</button>
                        </div>
                        {this.state.categories.map((elem) => <Category
                            handleSelectCategory={this.handleSelectCategory.bind(this)}
                            handleUpdateList={this.handleUpdateList.bind(this)}
                            key={elem.key}
                            data={elem}/>)}
                    </div>
                    <div className="App-tasks">
                        <div className="Task-new">
                            <input placeholder="Enter task title"/>
                            <button onClick={this.handleAddTaskClick.bind(this)}>Add</button>
                        </div>
                        {this.state.tasks.length > 0 ? this.state.tasks.map((elem) => <Task
                                taskCompleteClick={this.handleTaskCompleteClick.bind(this)}
                                key={elem.key}
                                data={elem}/>) : <p>Please select a category</p>}
                    </div>
                </div>
            </div>
        );

    }
}

export default MainView;
