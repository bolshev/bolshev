import React from 'react';
import './css/App.css';
import {browserHistory as history} from 'react-router';

class History extends React.Component {
    render() {
        return (
            <div className="App-history">
                <button onClick={history.goBack}>Back</button>
                <button onClick={history.goForward}>Forward</button>
            </div>
        );
    }
}

export default History;
