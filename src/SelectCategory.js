import React, {Component} from 'react';
import './Category.css';

class SelectCategory extends Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.onClick = props.handleCategorySelect;
    }

    handleSelectCategory() {
        console.log("SelectCategory:handleSelectCategory");
        this.onClick(this.state);
    }

    render() {
        return (
            <div className="Category">
                <div className="Category-content">
                    {this.state.children ? <span className="Category-expand">^</span> :
                        <span className="Category-expand"/>}
                    <span className="Category-title">
                        {this.state.title}
                    </span>
                    {this.props.selectedKey !== this.state.key ?
                        <button onClick={this.handleSelectCategory.bind(this)}>Select</button> : ""}
                </div>
                {this.state.children ?
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
