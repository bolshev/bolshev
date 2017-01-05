import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory as history} from 'react-router';
import App from './App';
import EditTask from './EditTask';
import EditCategory from './EditCategory';
import MainView from './MainView';
import NotFound from './NotFound';
import './index.css';

ReactDOM.render(
    (
        <Router
            history={history}
            onUpdate={() => console.log('updated', arguments)}
        >
            <Route path="/" component={App}>
                <IndexRoute component={MainView}/>
                <Route path="task/:taskKey" component={EditTask}/>
                <Route path="category/:categoryKey" component={EditCategory}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    ),
    document.getElementById('root')
);
