import React, {Component} from 'react';
import Progress from 'react-progressbar';
import './App.css';
import './Category.css';
import './Task.css';
import Server from './Server';
import Category from './Category';
import Task from './Task';

class MainView extends Component {
    componentWillMount() {
        let server = new Server();
        let data = server.getAllData();

        data.tasks = [];
        this.setState(data);
    }

    handleSelectCategory(element, flag) {
        console.log("handleSelectCategory");
        let state = this.state;

        state.tasks = [];
        state.categories.forEach((elem) => {
            state.tasks = state.tasks.concat(this.checkChildren(elem, element, flag));
        });
        console.log(state.tasks);
        this.setState(state);
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

export default MainView;
