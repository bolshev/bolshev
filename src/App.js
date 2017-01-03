import React, {Component} from 'react';
import Progress from 'react-progressbar';
import './App.css';
import './Category.css';
import './Task.css';
import Category from './Category';
import Task from './Task';
import EditTask from './EditTask';

class App extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        props.data.tasks = [];
        this.state = props.data;
    }

    handleSelectCategory(element, flag) {
        console.log("handleSelectCategory");
        var state = this.state;

        state.tasks = [];
        state.categories.forEach((elem) => {
            state.tasks = state.tasks.concat(this.checkChildren(state.tasks, elem, element, flag));
        });
        console.log(state.tasks);
        this.setState(state);
    }

    checkChildren(tasks, elem, element, flag) {
        if (elem.key === element.key) {
            elem.selected = flag;
        }

        if (elem.selected) {
            tasks = tasks.concat(elem.tasks);
        }

        if (elem.children) {
            elem.children.forEach((elem) => {
                tasks = tasks.concat(this.checkChildren(tasks, elem, element, flag));
            });
        }
        return tasks;
    }

    handleTaskEditClick(element) {
        console.log("handleTaskEditClick");
        let state = this.state;
        state.editTask = true;
        state.task = element;
        this.setState(state);
    }

    handleTaskEditClose() {
        console.log("handleTaskEditClose");
        let state = this.state;
        state.editTask = false;
        this.setState(state);
    }

    render() {
        if (this.state.editTask) {
            return (
                <div className="App">
                    <div className="App-header">
                        <h2>Edit {this.state.task.title}</h2>
                    </div>
                    <div className="App-content">
                        <div className="App-categories">
                            {this.state.categories.map((elem) => <Category isEdit={this.state.editTask}
                                                                           key={elem.key}
                                                                           data={elem}/>)}
                        </div>
                        <div className="App-tasks">
                            <EditTask data={this.state.task} onClick={this.handleTaskEditClose.bind(this)}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <div className="App-header">
                        <h2>TO-DO List</h2>
                    </div>
                    <div className="App-progress">
                        <Progress completed={75}/>
                    </div>
                    <div className="App-content">
                        <div className="App-categories">
                            <div className="Category-new">
                                <input placeholder="Enter category title"/>
                                <button>Add</button>
                            </div>
                            {this.state.categories.map((elem) => <Category
                                onClick={this.handleSelectCategory.bind(this)}
                                isEdit={this.state.editTask}
                                key={elem.key}
                                data={elem}/>)}
                        </div>
                        <div className="App-tasks">
                            <div className="Task-new">
                                <input placeholder="Enter task title"/>
                                <button>Add</button>
                            </div>
                            {this.state.tasks.length > 0 ? this.state.tasks.map((elem) => <Task
                                    onClick={this.handleTaskEditClick.bind(this)}
                                    key={elem.key}
                                    data={elem}/>) : <p>Please select a category</p>}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default App;
