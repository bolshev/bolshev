import React, {Component} from 'react';
import './css/Category.css';

class SelectCategory extends Component {
    constructor(props) {
        super(props);
        props.data.showChildren = true;
        this.state = props.data;
        this.onClick = props.handleCategorySelect;
    }

    handleSelectCategory() {
        console.log("SelectCategory:handleSelectCategory");
        this.onClick(this.state);
    }

    handleCollapseExpandClick(e) {
        console.log("Category:handleCollapseExpandClick");
        let state = this.state;
        state.showChildren = !this.state.showChildren;
        state.showChildren ? e.target.innerHTML = "^" : e.target.innerHTML = ">";
        this.setState(state);
    }

    render() {
        return (
            <div className="Category">
                <div className="Category-content">
                    {this.state.children && this.state.children.length > 0 ?
                        <span onClick={this.handleCollapseExpandClick.bind(this)} className="Category-expand">^</span> :
                        <span className="Category-expand"/>}
                    <span className="Category-title">
                        {this.state.title}
                    </span>
                    {this.props.selectedKey !== this.state.key ?
                        <button onClick={this.handleSelectCategory.bind(this)}>Select</button> : ""}
                </div>
                {this.state.children && this.state.showChildren ?
                    <div className="Category-sublist">
                        {this.state.children.map((elem) => <SelectCategory selectedKey={this.props.selectedKey}
                                                                           handleCategorySelect={this.onClick}
                                                                           key={elem.key}
                                                                           data={elem}/>)}
                    </div> : ""
                }
            </div>
        );
    }
}

export default SelectCategory;
