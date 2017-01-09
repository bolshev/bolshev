import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CategoryComponent from './CategoryComponent';
import * as filterActions from './redux/FilterActions';
import * as categoryActions from './redux/CategoryActions';

class CategoryContainer extends React.Component {
    handleSelectCategory(key, selected) {
        console.log("CategoryContainer:handleSelectCategory");
        this.props.filterActions.selectCategory(key, selected);
    }

    handleDeleteClick(key) {
        console.log("CategoryContainer:handleDeleteClick");
        this.props.categoryActions.deleteCategory(key);
    }

    render() {
        return (
            <CategoryComponent
                data={ this.props.data}
                actions={{
                    selectCategory: this.handleSelectCategory.bind(this),
                    deleteClick: this.handleDeleteClick.bind(this),
                }}
                filters={ this.props.filters}

            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterActions: bindActionCreators(filterActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch)
    }
}

export default connect(false, mapDispatchToProps)(CategoryContainer)
