import React from 'react';
import Progress from 'react-progressbar';
import './css/App.css';
import './css/Category.css';
import './css/Task.css';
import TaskStore from './flux/TaskStore';
import Server from './Server';
import Category from './Category';
import History from './History';
import Task from './Task';
import {Link} from 'react-router';

class MainView extends React.Component {
    componentWillMount() {
        TaskStore.fetchTasks();
        let data = {
            filter: Server.loadFilter(this.props.location.query),
            categories: Server.getAllCategories()
        };

        data.tasks = [];
        data.progress = Server.getProgress();
        this.setState(data);
        Server.saveFilter(data.filter, true);
    }

    componentDidMount() {
        let state = this.state;
        state.tasks = this.filterTasksByCategories(TaskStore.getTasks());
        this.setState(state);
        TaskStore.subscribe(this.onChange.bind(this));
    }

    componentWillUnmount() {
        TaskStore.unsubscribe(this.onChange);
    }

    onChange() {
        console.log("MainView:onChange");
        let state = this.state;
        state.tasks = this.filterTasksByCategories(TaskStore.getTasks());
        state.progress = Server.getProgress();
        this.setState(state);
    }

    handleSelectCategory(category, flag) {
        console.log("MainView:handleSelectCategory");
        let state = this.state;

        if (flag) {
            state.filter.selectedCategories.push(category.key);
        } else {
            let index = state.filter.selectedCategories.indexOf(category.key);
            if (index > -1) {
                state.filter.selectedCategories.splice(index, 1);
            }
        }

        state.tasks = this.filterTasksByCategories(TaskStore.getTasks());

        Server.saveFilter(state.filter);
        this.setState(state);
        Server.updateCategory(category);
    }

    filterTasksByCategories(loadedTasks) {
        let tasks = Object.values(loadedTasks)
            .filter((task) => this.state.filter.selectedCategories.includes(task.categoryKey), this);
        tasks.sort(Server.sortByOrder);
        return tasks;
    }

    handleAddCategoryClick() {
        console.log("MainView:handleAddTaskClick");
        Server.updateCategory({title: this.newCategoryName.value});
        this.handleUpdateList();
    }

    handleUpdateList() {
        console.log("MainView:handleUpdateList");
        let state = this.state;
        state.categories = Server.getAllCategories();
        this.setState(state);
    }

    handleShowIsDoneClick(e) {
        console.log("MainView:handleShowIsDoneClick");
        let state = this.state;
        state.filter.showDone = e.target.checked;
        Server.saveFilter(state.filter);
        this.setState(state);
    }

    handleSearchChange(e) {
        console.log("MainView:handleSearchChange");
        let state = this.state;
        state.filter.fText = e.target.value;
        Server.saveFilter(state.filter);
        this.setState(state);
    }

    handleSearchClean() {
        console.log("MainView:handleSearchClean");
        let state = this.state;
        state.filter.fText = "";
        Server.saveFilter(state.filter);
        this.setState(state);
    }

    handleNewTaskChange(e) {
        console.log("MainView:handleNewTaskChange");
        let state = this.state;
        state.newTaskName = e.target.value;
        Server.saveFilter(state.filter);
        this.setState(state);
    }

    render() {
        return (
            <div className="App">
                <History/>
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
