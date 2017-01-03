import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let data = {
    categories: [
        {
            key: "cat1",
            title: "Category 1",
            tasks: [
                {
                    title: "task 1",
                    key: "t1",
                    isDone: true
                },
                {
                    title: "task 2",
                    key: "t2",
                    isDone: false
                },
                {
                    title: "task 33",
                    key: "t33",
                    isDone: true
                }
            ],
            children: [
                {
                    key: "cat11",
                    title: "Category 11",
                    tasks: [
                        {
                            title: "task 3",
                            key: "t3",
                            isDone: false
                        },
                        {
                            title: "task 4",
                            key: "t4",
                            isDone: false
                        },
                        {
                            title: "task 5",
                            key: "t5",
                            isDone: true
                        }
                    ]
                },
                {
                    key: "cat12",
                    title: "Category 12",
                    tasks: [
                        {
                            title: "task 6",
                            key: "t6",
                            isDone: true
                        }
                    ]
                },
                {
                    key: "cat13",
                    title: "Category 13",
                    tasks: [
                        {
                            title: "task 7",
                            key: "t7",
                            isDone: true
                        },
                        {
                            title: "task 8",
                            key: "t8",
                            isDone: false
                        }
                    ]
                }
            ]
        },
        {
            key: "cat2",
            title: "Category 2",
            tasks: [
                {
                    title: "task 9",
                    key: "t9",
                    isDone: true
                },
                {
                    title: "task 10",
                    key: "t10",
                    isDone: false
                }
            ]
        },
        {
            key: "cat3",
            title: "Category 3",
            tasks: [
                {
                    title: "task 12",
                    key: "t12",
                    isDone: false
                }
            ],
            children: [
                {
                    key: "cat31",
                    title: "Category 31",
                    tasks: [
                        {
                            title: "task 13",
                            key: "t13",
                            isDone: false
                        },
                        {
                            title: "task 14",
                            key: "t14",
                            isDone: true
                        }
                    ]
                },
                {
                    key: "cat32",
                    title: "Category 32",
                    tasks: [
                        {
                            title: "task 15",
                            key: "t15",
                            isDone: false
                        },
                        {
                            title: "task 16",
                            key: "t16",
                            isDone: true
                        },
                        {
                            title: "task 17",
                            key: "t17",
                            isDone: true
                        },
                        {
                            title: "task 18",
                            key: "t18",
                            isDone: false
                        }
                    ]
                }
            ]
        }
    ]
};

ReactDOM.render(
    <App data={data}/>,
    document.getElementById('root')
);
