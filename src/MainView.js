import React from 'react';
import Progress from 'react-progressbar';
import './App.css';
import './Category.css';
import './Task.css';
import Server from './Server';
import Category from './Category';
import Task from './Task';
import {Link} from 'react-router';

class MainView extends React.Component {
    componentWillMount() {
        this.server = new Server();
        let data = {
            filter: this.server.loadFilter(this.props.location.query),
            categories: this.server.getAllCategoriesWithTasks()
        };

        data.tasks = this.checkSelected(data, {}, null);
        data.progress = this.server.getProgress();
        this.setState(data);
        this.server.saveFilter(data.filter, true);
    }

    handleSelectCategory(category, flag) {
        console.log("MainView:handleSelectCategory");
        let state = this.state;

        state.tasks = this.checkSelected(state, category, flag);

        if (flag) {
            state.filter.selectedCategories.push(category.key);
        } else {
            let index = state.filter.selectedCategories.indexOf(category.key);
            if (index > -1) {
                state.filter.selectedCategories.splice(index, 1);
            }
        }

        this.server.saveFilter(state.filter);
        this.setState(state);
        this.server.updateCategory(category);
    }

    checkSelected(state, category, flag) {
        let tasks = [];
        state.categories.forEach((elem) => {
            tasks = tasks.concat(this.checkChildren(elem, category, flag));
        });
        tasks.sort(this.server.sortByOrder);

        return tasks;
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

        tasks.sort(this.server.sortByOrder);

        return tasks;
    }

    handleTaskCompleteClick(task) {
        console.log("MainView:handleTaskCompleteClick");
        let state = this.state;
        state.progress = this.server.getProgress();
        this.setState(state);
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

    handleShowIsDoneClick(e) {
        console.log("MainView:handleShowIsDoneClick");
        let state = this.state;
        state.filter.showDone = e.target.checked;
        this.server.saveFilter(state.filter);
        this.setState(state);
    }

    handleSearchChange(e) {
        console.log("MainView:handleSearchChange");
        let state = this.state;
        state.filter.fText = e.target.value;
        this.server.saveFilter(state.filter);
        this.setState(state);
    }

    handleSearchClean() {
        console.log("MainView:handleSearchClean");
        let state = this.state;
        state.filter.fText = "";
        this.server.saveFilter(state.filter);
        this.setState(state);
    }

    handleNewTaskChange(e) {
        console.log("MainView:handleNewTaskChange");
        let state = this.state;
        state.newTaskName = e.target.value;
        this.server.saveFilter(state.filter);
        this.setState(state);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>TO-DO List</h2>
                    <div className="App-filter">
                        <input type="checkbox" checked={this.state.filter.showDone} value={this.state.filter.showDone}
                               onChange={this.handleShowIsDoneClick.bind(this)}/> Show done
                        <input type="text" value={this.state.filter.fText} onChange={this.handleSearchChange.bind(this)}
                               placeholder="Search"/>
                        <button onChange={this.handleSearchClean.bind(this)}>X</button>
                    </div>
                </div>
                <div className="App-progress">
                    <Progress completed={this.state.progress}/>
                </div>
                <div className="App-content">
                    <div className="App-categories">
                        <div className="Category-new">
                            <input type="text" ref={(input) => {
                                this.newCategoryName = input;
                            }} placeholder="Enter category title"/>
                            <button onClick={this.handleAddCategoryClick.bind(this)}>Add</button>
                        </div>
                        {this.state.categories.map((elem) => <Category
                            handleSelectCategory={this.handleSelectCategory.bind(this)}
                            handleUpdateList={this.handleUpdateList.bind(this)}
                            filter={this.state.filter}
                            key={elem.key}
                            data={elem}/>)}
                    </div>
                    <div className="App-tasks">
                        <div className="Task-new">
                            <input placeholder="Enter task title" value={this.state.newTaskName}
                                   onChange={this.handleNewTaskChange.bind(this)}/>
                            <Link to={{pathname: '/task', query: {taskName: this.state.newTaskName}}}>Add</Link>
                        </div>
                        {this.state.tasks.length > 0 ? this.state.tasks.map((elem) => <Task
                                taskCompleteClick={this.handleTaskCompleteClick.bind(this)}
                                filter={this.state.filter}
                                key={elem.key}
                                data={elem}/>) : <p>Please select a category</p>}
                    </div>
                </div>
            </div>
        );

    }
}

export default MainView;
