// SERVER emulation start
import {browserHistory as history} from 'react-router';

class Server {
    constructor() {
        this.load();
        this.save();
    }

    defaultData = {
        order: 1,
        categories: {
            "cat1": {
                key: "cat1",
                order: 1,
                title: "Category 1"
            },
            "cat11": {
                key: "cat11",
                order: 1,
                title: "Category 11",
                categoryKey: "cat1"
            },
            "cat12": {
                key: "cat12",
                order: 2,
                title: "Category 12",
                categoryKey: "cat1"
            },
            "cat13": {
                key: "cat13",
                order: 3,
                title: "Category 13",
                categoryKey: "cat1"
            },
            "cat2": {
                key: "cat2",
                order: 2,
                title: "Category 2"
            },
            "cat3": {
                key: "cat3",
                order: 3,
                title: "Category 3"
            },
            "cat31": {
                key: "cat31",
                order: 1,
                title: "Category 31",
                categoryKey: "cat3"
            },
            "cat32": {
                key: "cat32",
                order: 2,
                title: "Category 32",
                categoryKey: "cat3"
            }
        },
        tasks: {
            "t3": {
                categoryKey: "cat11",
                title: "task 3",
                key: "t3",
                order: 1,
                isDone: false
            },
            "t4": {
                categoryKey: "cat11",
                title: "task 4",
                key: "t4",
                order: 2,
                isDone: false
            },
            "t5": {
                categoryKey: "cat11",
                title: "task 5",
                key: "t5",
                order: 3,
                isDone: true
            },
            "t6": {
                categoryKey: "cat12",
                title: "task 6",
                key: "t6",
                order: 4,
                isDone: true
            },
            "t7": {
                categoryKey: "cat13",
                title: "task 7",
                key: "t7",
                order: 5,
                isDone: true
            },
            "t8": {
                categoryKey: "cat13",
                title: "task 8",
                key: "t8",
                order: 6,
                isDone: false
            },
            "t9": {
                categoryKey: "cat2",
                title: "task 9",
                key: "t9",
                order: 7,
                isDone: true
            },
            "t10": {
                categoryKey: "cat2",
                title: "task 10",
                key: "t10",
                order: 8,
                isDone: false
            },
            "t12": {
                categoryKey: "cat3",
                title: "task 12",
                key: "t12",
                order: 9,
                isDone: false
            },
            "t1": {
                categoryKey: "cat1",
                title: "task 1",
                key: "t1",
                order: 10,
                isDone: true
            },
            "t13": {
                categoryKey: "cat31",
                title: "task 13",
                key: "t13",
                order: 11,
                isDone: false
            },
            "t14": {
                categoryKey: "cat31",
                title: "task 14",
                key: "t14",
                order: 12,
                isDone: true
            },
            "t2": {
                categoryKey: "cat1",
                title: "task 2",
                key: "t2",
                order: 14,
                isDone: false
            },
            "t33": {
                categoryKey: "cat1",
                title: "task 33",
                key: "t33",
                order: 15,
                isDone: true
            },
            "t15": {
                categoryKey: "cat32",
                title: "task 15",
                key: "t15",
                order: 13,
                isDone: false
            },
            "t16": {
                categoryKey: "cat32",
                title: "task 16",
                key: "t16",
                order: 16,
                isDone: true
            },
            "t17": {
                categoryKey: "cat32",
                title: "task 17",
                key: "t17",
                order: 17,
                isDone: true
            },
            "t18": {
                categoryKey: "cat32",
                title: "task 18",
                key: "t18",
                order: 18,
                isDone: false
            }
        }
    };

    load() {
        let data = localStorage.getItem("data");
        if (!data || data === "undefined") {
            data = this.defaultData;
        } else {
            data = JSON.parse(data);
        }

        this.setData(data);
    }

    save() {
        localStorage.setItem("data", JSON.stringify(this._data));
    }

    setData(data) {
        this._data = data;
    }

    getAllData() {
        this.load();
        return this._data;
    }

    sortByOrder(a, b) {
        if (a.order > b.order) return 1;
        if (a.order < b.order) return -1;
    }

    getAllCategories() {
        return this.getAllCategoriesWithTasks(false);
    }

    getAllCategoriesWithTasks(withTasks = true) {
        this.load();
        this.loadFilter();

        let categories = [];
        // eslint-disable-next-line
        for (let [k, cat] of Object.entries(this._data.categories)) {
            if (!cat.categoryKey) {
                cat.selected = this.filters.selectedCategories.includes(cat.key);
                categories.push(cat);
            }
        }

        categories.sort(this.sortByOrder);

        categories.forEach((parent) => {
            parent.children = [];
            // eslint-disable-next-line
            for (let [k, child] of Object.entries(this._data.categories)) {
                if (child.categoryKey === parent.key) {
                    child.selected = this.filters.selectedCategories.includes(child.key);
                    parent.children.push(child);
                }
            }

            parent.children.sort(this.sortByOrder);

            let isCompleted = true;
            if (withTasks) parent.tasks = [];
            // eslint-disable-next-line
            for (let [k, task] of Object.entries(this._data.tasks)) {
                if (task.categoryKey === parent.key) {
                    if (withTasks) parent.tasks.push(task);
                    if (!task.isDone) {
                        isCompleted = false;
                    }
                }
            }

            this._data.categories[parent.key].isCompleted = isCompleted;
        });

        categories.forEach((parent) => {
            parent.children.forEach((child) => {
                let isCompleted = true;
                if (withTasks) child.tasks = [];
                // eslint-disable-next-line
                for (let [k, task] of Object.entries(this._data.tasks)) {
                    if (task.categoryKey === child.key) {
                        if (withTasks) child.tasks.push(task);
                        if (!task.isDone) {
                            isCompleted = false;
                        }
                    }
                }

                this._data.categories[child.key].isCompleted = isCompleted;

                if (!isCompleted) {
                    this._data.categories[parent.key].isCompleted = isCompleted;
                }
            });
        });

        this.save();
        return categories;
    }

    getTaskByKey(key) {
        this.load();
        return this._data.tasks[key];
    }

    getCategoryByKey(key) {
        this.load();
        return this._data.categories[key];
    }

    updateTask(task) {
        this.load();
        if (!task.key) {
            task.key = `t${this.getRandomTaskKey()}`;
            this.updateTasksOrder();
            task.order = 1;
        }
        this._data.tasks[task.key] = task;
        this.save();
        this.getAllCategories();
    }

    getRandomInt() {
        return Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
    }

    getRandomTaskKey() {
        this.load();
        let num = this.getRandomInt();
        if (this._data.tasks[`t${num}`]) {
            num = this.getRandomTaskKey();
        }
        return num;
    }

    getRandomCategoryKey() {
        this.load();
        let num = this.getRandomInt();
        if (this._data.categories[`cat${num}`]) {
            num = this.getRandomTaskKey();
        }
        return num;
    }

    updateCategoriesOrder() {
        for (let key of Object.keys(this._data.categories)) {
            this._data.categories[key].order++;
        }
    }

    updateTasksOrder() {
        for (let key of Object.keys(this._data.tasks)) {
            this._data.tasks[key].order++;
        }
    }

    updateCategory(category) {
        this.load();
        if (!category.key) {
            category.key = `cat${this.getRandomCategoryKey()}`;
            this.updateCategoriesOrder();
            category.order = 1;
        }

        category = {
            key: category.key,
            title: category.title,
            order: category.order,
            isCompleted: category.isCompleted,
            categoryKey: category.categoryKey
        };

        this._data.categories[category.key] = category;
        this.save();
    }

    deleteCategory(key) {
        this.load();

        // eslint-disable-next-line
        for (let [k, cat] of Object.entries(this._data.categories)) {
            if (cat.categoryKey === key) {
                delete this._data.categories[k];
            }
        }

        delete this._data.categories[key];
        this.save();
    }

    getProgress() {
        this.load();
        let completed = 0;
        // eslint-disable-next-line
        for (let [k, cat] of Object.entries(this._data.categories)) {
            if (cat.isCompleted) {
                completed++;
            }
        }

        return parseInt((completed / Object.keys(this._data.categories).length) * 100, 10);
    }

    saveFilters(filters, isReplace) {
        this.filters = filters;
        localStorage.setItem("filters", JSON.stringify(filters));

        isReplace ? history.replace("/" + this.getFilters()) : history.push("/" + this.getFilters());
    }

    loadFilter(query) {
        let filters = query && Object.keys(query).length !== 0 ? query : localStorage.getItem("filters");
        if (!filters || filters === "undefined") {
            filters = {
                showDone: false,
                selectedCategories: [],
                fText: ""
            };
        } else if (typeof filters === "string") {
            filters = JSON.parse(filters);
        } else {
            filters.selectedCategories = filters.selectedCategories ? filters.selectedCategories.split(",") : [];
            filters.showDone = (filters.showDone === "true");
            filters.fText = filters.fText || "";
        }

        this.filters = filters;
        localStorage.setItem("filters", JSON.stringify(filters));
        return filters;
    }

    getFilters() {
        let query = `?showDone=${this.filters.showDone}&fText=${this.filters.fText}&selectedCategories=`;
        // eslint-disable-next-line
        for (let cat of this.filters.selectedCategories) {
            query = query + cat + ",";
        }

        return query.substr(0, query.length - 1);
    }
}

export default new Server();
// Server emulation end