import React from 'react';
import {browserHistory as history} from 'react-router';
import './css/Category.css';
import Server from './Server';

class Category extends React.Component {
    constructor(props) {
        super(props);
        props.data.selected = props.data.selected || false;
        props.data.showChildren = true;
        this.state = props.data;
    }

    handleSelectCategory() {
        console.log("Category:handleSelectCategory");
        let state = this.state;
        state.selected = !this.state.selected;
        this.setState(state);
        this.props.handleSelectCategory(this.state, state.selected);
    }

    handleAddCategoryClick(e) {
        console.log("Category:handleAddCategoryClick");
        history.push("/category/" + this.state.key + "/add");
    }

    handleEditClick() {
        console.log("Category:handleEditClick");
        history.push("/category/" + this.state.key)
    }

    handleDeleteClick() {
        console.log("Category:handleDeleteClick");
        Server.deleteCategory(this.state.key);
        this.props.handleUpdateList();
    }

    handleCollapseExpandClick(e) {
        console.log("Category:handleCollapseExpandClick");
        let state = this.state;
        state.showChildren = !this.state.showChildren;
        state.showChildren ? e.target.innerHTML = "^" : e.target.innerHTML = ">";
        this.setState(state);
    }

    render() {
        if ((!this.props.filter.showDone && this.state.isCompleted)) {
            return (null);
        } else {
            return (
                <div className="Category">
                    <div className={this.state.selected ? "Category-content Category-selected" : "Category-content"}>
                        {this.state.children && this.state.children.length > 0 ?
                            <span onClick={this.handleCollapseExpandClick.bind(this)}
                                  className="Category-expand">^</span> :
                            <span className="Category-expand"/>}
                        <span className="Category-title" onClick={this.handleSelectCategory.bind(this)}>
                            {this.state.title}
                        </span>
                        <button onClick={this.handleEditClick.bind(this)}>Edit</button>
                        <button onClick={() => {
                            if (confirm('Delete the category?')) {
                                this.handleDeleteClick();
                            }
                        }}>
                            Delete
                        </button>
                        <button onClick={this.handleAddCategoryClick.bind(this)}>+</button>
                    </div>
                    {this.state.children && this.state.showChildren ?
                        <div className="Category-sublist">
                            {this.state.children.map((elem) => <Category
                                handleSelectCategory={this.props.handleSelectCategory}
                                handleUpdateList={this.props.handleUpdateList}
                                filter={this.props.filter}
                                key={elem.key}
                                data={elem}/>)}
                        </div> : ""
                    }
                </div>
            );
        }
    }
}

export default Category;
