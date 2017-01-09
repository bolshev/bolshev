import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory as history} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './redux/CreateStore'
import App from './App';
import EditTask from './EditTask';
import EditCategory from './EditCategory';
import MainView from './MainContainer';
import NotFound from './NotFound';
import './css/index.css';

const store = configureStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history} onUpdate={() => console.log('updated', arguments)}>
                <Route path="/" component={App}>
                    <IndexRoute component={MainView}/>
                    <Route path="task(/:taskKey)" component={EditTask}/>
                    <Route path="category/:categoryKey/:action" component={EditCategory}/>
                    <Route path="category/(:categoryKey)" component={EditCategory}/>
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);
