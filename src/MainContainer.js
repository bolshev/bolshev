import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './css/App.css';
import './css/Category.css';
import './css/Task.css';
import TaskStore from './flux/TaskStore';
import Server from './Server';
import * as filterActions from './redux/FilterActions';
import * as categoryActions from './redux/CategoryActions';
import {MainComponent} from './MainComponent';

class MainContainer extends React.Component {
    componentWillMount() {
        TaskStore.fetchTasks();
        let data = {
            filters: this.props.filters,
        };

        data.tasks = [];
        data.progress = Server.getProgress();
        this.setState(data);
        this.props.filterActions.saveFilters(data.filters, true);
    }

    componentDidMount() {
        this.onChange();
        let state = this.state;
        state.tasks = this.filterTasksByCategories(TaskStore.getTasks(), this.props.filters);
        this.setState(state);
        TaskStore.subscribe(this.onChange.bind(this));
    }

    componentWillUnmount() {
        TaskStore.unsubscribe(this.onChange);
    }

    onChange() {
        console.log("MainContainer:onChange");
        this.handleUpdateList();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.filters !== nextState.filters) {
            nextState.tasks = this.filterTasksByCategories(TaskStore.getTasks(), nextProps.filters);
        }
    }

    filterTasksByCategories(loadedTasks, filters) {
        let tasks = Object.values(loadedTasks)
            .filter((task) => filters.selectedCategories.includes(task.categoryKey), this);
        tasks.sort(Server.sortByOrder);
        return tasks;
    }

    handleAddCategoryClick(title) {
        console.log("MainContainer:handleAddTaskClick");
        Server.updateCategory({title: title});
        this.handleUpdateList();
    }

    handleUpdateList() {
        console.log("MainContainer:handleUpdateList");
        this.props.categoryActions.loadCategories();
    }

    handleShowIsDoneClick(e) {
        console.log("MainContainer:handleShowIsDoneClick");
        let state = this.state;
        state.filters.showDone = e.target.checked;
        this.props.filterActions.saveFilters(state.filters);
    }

    handleSearchChange(e) {
        console.log("MainContainer:handleSearchChange");
        let state = this.state;
        state.filters.fText = e.target.value;
        this.props.filterActions.saveFilters(state.filters);
    }

    handleSearchClean() {
        console.log("MainContainer:handleSearchClean");
        let state = this.state;
        state.filters.fText = "";
        this.props.filterActions.saveFilters(state.filters);
    }

    render() {
        return (
            <div>
                <MainComponent
                    categories={this.props.categories}
                    tasks={this.state.tasks}
                    progress={this.state.progress}
                    filters={this.state.filters}
                    actions={{
                        showDoneClick: this.handleShowIsDoneClick.bind(this),
                        searchChange: this.handleSearchChange.bind(this),
                        searchClean: this.handleSearchClean.bind(this),
                        addCategoryClick: this.handleAddCategoryClick.bind(this),
                    }}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterActions: bindActionCreators(filterActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
