import React from 'react';
import Progress from 'react-progressbar';
import Category from './CategoryContainer';
import Task from './Task';
import History from './History';
import {Link} from 'react-router';
import './css/Category.css';

export class MainComponent extends React.Component {
    render() {
        return (
            <div className="App">
                <History/>
                <div className="App-header">
                    <h2>TO-DO List</h2>
                    <Filters filters={this.props.filters} actions={this.props.actions}/>
                </div>
                <div className="App-progress">
                    <Progress completed={this.props.progress}/>
                </div>
                <div className="App-content">
                    <Categories
                        actions={this.props.actions}
                        categories={this.props.categories}
                        filters={this.props.filters}/>
                    <Tasks
                        actions={this.props.actions}
                        tasks={this.props.tasks}
                        filters={this.props.filters}/>
                </div>
            </div>
        );
    }
}

export class Filters extends React.Component {
    render() {
        const {showDone, fText} = this.props.filters;
        const {showDoneClick, searchChange, searchClean} = this.props.actions;

        return (
            <div className="App-filter">
                <input type="checkbox" checked={showDone} value={showDone}
                       onChange={showDoneClick}/> Show done
                <input type="text" value={fText}
                       onChange={searchChange}
                       placeholder="Search"/>
                <button onClick={searchClean}>X</button>
            </div>
        );
    }
}

export class Categories extends React.Component {


    render() {
        const {addCategoryClick} = this.props.actions;

        function handleAddCategoryClick(e) {
            console.log("MainContainer:handleNewTaskChange");
            addCategoryClick(this.newCategoryName.value);
        }

        return (
            <div className="App-categories">
                <div className="Category-new">
                    <input type="text" ref={(input) => {
                        this.newCategoryName = input;
                    }} placeholder="Enter category title"/>
                    <button onClick={handleAddCategoryClick.bind(this)}>Add</button>
                </div>
                {this.props.categories.map((elem) => <Category
                    filters={this.props.filters}
                    key={elem.key}
                    data={elem}/>)}
            </div>
        );
    }
}

export class Tasks extends React.Component {
    constructor() {
        super();
        this.state = {newTaskName: ""};
    }

    handleNewTaskChange(e) {
        console.log("MainContainer:handleNewTaskChange");
        let state = this.state;
        state.newTaskName = e.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="App-tasks">
                <div className="Task-new">
                    <input placeholder="Enter task title" value={this.state.newTaskName}
                           onChange={this.handleNewTaskChange.bind(this)}/>
                    <Link to={{pathname: '/task', query: {taskName: this.state.newTaskName}}}>Add</Link>
                </div>
                {this.props.tasks.length > 0 ? this.props.tasks.map((elem) => <Task
                        filters={this.props.filters}
                        key={elem.key}
                        data={elem}/>) : <p>Please select a category</p>}
            </div>
        );
    }
}