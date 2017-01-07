import React from 'react';
import {browserHistory as history} from 'react-router';
import './Task.css';
import Server from './Server';

class EditCategory extends React.Component {
    componentWillMount() {
        this.server = new Server();
        let data = {};
        data.categories = this.server.getAllCategoriesWithTasks();
        if (this.props.routeParams.categoryKey && !this.props.routeParams.action) {
            data.category = this.server.getCategoryByKey(this.props.routeParams.categoryKey);
        } else {
            data.category = {};
        }

        this.setState(data);
    }

    handleChangeTitle(e) {
        console.log("EditCategory:handleChangeTitle");
        let state = this.state;
        state.category.title = e.target.value;
        this.setState(state);
    }

    handleSaveClick() {
        console.log("EditCategory:handleSaveClick");
        let category = this.state.category;
        if(this.props.routeParams.categoryKey && this.props.routeParams.action) {
            category.categoryKey = this.props.routeParams.categoryKey;
        }
        this.server.updateCategory(category);
        history.push("/");
    }

    handleCancelClick() {
        console.log("EditCategory:handleCancelClick");
        history.push("/");
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Edit {this.state.category.title}</h2>
                </div>
                <div className="App-content">
                    <div className="App-edit-category">
                        <div className="Category-edit">
                            <div className="Category-edit-buttons-right">
                                <button onClick={this.handleSaveClick.bind(this)}>Save changes</button>
                                <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
                            </div>
                            <div>
                                <input type="text" onChange={this.handleChangeTitle.bind(this)}
                                       value={this.state.category.title || "New category"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCategory;
