import React from 'react';
import {browserHistory as history} from 'react-router';
import './css/Category.css';

class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.data.selected || false,
            showChildren: true
        }
    }

    handleAddCategoryClick(e) {
        console.log("CategoryComponent:handleAddCategoryClick");
        history.push(`/category/${this.props.key}/add`);
    }

    handleEditClick() {
        console.log("CategoryComponent:handleEditClick");
        history.push(`/category/${this.props.key}`)
    }

    handleCollapseExpandClick(e) {
        console.log("CategoryComponent:handleCollapseExpandClick");
        let state = this.state;
        state.showChildren = !this.state.showChildren;
        state.showChildren ? e.target.innerHTML = "^" : e.target.innerHTML = ">";
        this.setState(state);
    }

    render() {
        const {selectCategory, deleteClick} = this.props.actions;

        function _selectCategory() {
            let state = this.state;
            state.selected = !this.state.selected;
            this.setState(state);
            selectCategory(this.props.data.key, state.selected);
        }

        if ((!this.props.filters.showDone && this.props.data.isCompleted)) {
            return (null);
        } else {
            return (
                <div className="Category">
                    <div
                        className={this.state.selected ? "Category-content Category-selected" : "Category-content"}>
                        {this.props.data.children && this.props.data.children.length > 0 ?
                            <span onClick={this.handleCollapseExpandClick.bind(this)}
                                  className="Category-expand">^</span> :
                            <span className="Category-expand"/>}
                        <span className="Category-title" onClick={_selectCategory.bind(this)}>
                            {this.props.data.title}
                        </span>
                        <button onClick={this.handleEditClick.bind(this)}>Edit</button>
                        <button onClick={() => {
                            if (confirm('Delete the category?')) {
                                deleteClick(this.props.data.key);
                            }
                        }}>
                            Delete
                        </button>
                        <button onClick={this.handleAddCategoryClick.bind(this)}>+</button>
                    </div>
                    {this.props.data.children && this.state.showChildren ?
                        <div className="Category-sublist">
                            {this.props.data.children.map((elem) => <CategoryComponent
                                actions={{selectCategory, deleteClick}}
                                filters={this.props.filters}
                                key={elem.key}
                                data={elem}/>)}
                        </div> : ""
                    }
                </div>
            );
        }
    }
}

export default CategoryComponent
