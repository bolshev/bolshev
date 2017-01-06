import React, {Component} from 'react';
import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);
        props.data.selected = props.data.selected || false;
        this.state = props.data;
        this.onClick = props.onClick;
    }

    handleSelectCategory() {
        console.log("Category:handleSelectCategory");
        let state = this.state;
        state.selected = !this.state.selected;
        this.setState(state);
        this.onClick(this.state, state.selected);
    }

    render() {
        return (
            <div className="Category">
                <div className={this.state.selected ? "Category-content Category-selected" : "Category-content"}>
                    {this.state.children ? <span className="Category-expand">^</span> :
                        <span className="Category-expand"/>}
                    <span className="Category-title" onClick={this.handleSelectCategory.bind(this)}>
                            {this.state.title}
                        </span>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>+</button>
                </div>
                {this.state.children ?
                    <div className="Category-sublist">
                        {this.state.children.map((elem) => <Category onClick={this.onClick}
                                                                     isEdit={this.isEdit}
                                                                     key={elem.key}
                                                                     data={elem}/>)}
                    </div> : ""
                }
            </div>
        );
    }
}

export default Category;
