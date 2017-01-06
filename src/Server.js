// SERVER emulation start

class Server {
    constructor() {
        let data = localStorage.getItem("data");
        if (!data || data === "undefined") {
            data = this.defaultData;
        } else {
            data = JSON.parse(data);
        }

        this.setData(data);
        this.save();
    }

    defaultData = {
        categories: {
            "cat1": {
                key: "cat1",
                title: "Category 1"
            },
            "cat11": {
                key: "cat11",
                title: "Category 11",
                categoryKey: "cat1"
            },
            "cat12": {
                key: "cat12",
                title: "Category 12",
                categoryKey: "cat1"
            },
            "cat13": {
                key: "cat13",
                title: "Category 13",
                categoryKey: "cat1"
            },
            "cat2": {
                key: "cat2",
                title: "Category 2"
            },
            "cat3": {
                key: "cat3",
                title: "Category 3"
            },
            "cat31": {
                key: "cat31",
                title: "Category 31",
                categoryKey: "cat3"
            },
            "cat32": {
                key: "cat32",
                title: "Category 32",
                categoryKey: "cat3"
            }
        },
        tasks: {
            "t3": {
                categoryKey: "cat11",
                title: "task 3",
                key: "t3",
                isDone: false
            },
            "t4": {
                categoryKey: "cat11",
                title: "task 4",
                key: "t4",
                isDone: false
            },
            "t5": {
                categoryKey: "cat11",
                title: "task 5",
                key: "t5",
                isDone: true
            },
            "t6": {
                categoryKey: "cat12",
                title: "task 6",
                key: "t6",
                isDone: true
            },
            "t7": {
                categoryKey: "cat13",
                title: "task 7",
                key: "t7",
                isDone: true
            },
            "t8": {
                categoryKey: "cat13",
                title: "task 8",
                key: "t8",
                isDone: false
            },
            "t9": {
                categoryKey: "cat2",
                title: "task 9",
                key: "t9",
                isDone: true
            },
            "t10": {
                categoryKey: "cat2",
                title: "task 10",
                key: "t10",
                isDone: false
            },
            "t12": {
                categoryKey: "cat3",
                title: "task 12",
                key: "t12",
                isDone: false
            },
            "t1": {
                categoryKey: "cat1",
                title: "task 1",
                key: "t1",
                isDone: true
            },
            "t13": {
                categoryKey: "cat31",
                title: "task 13",
                key: "t13",
                isDone: false
            },
            "t14": {
                categoryKey: "cat31",
                title: "task 14",
                key: "t14",
                isDone: true
            },
            "t2": {
                categoryKey: "cat1",
                title: "task 2",
                key: "t2",
                isDone: false
            },
            "t33": {
                categoryKey: "cat1",
                title: "task 33",
                key: "t33",
                isDone: true
            },
            "t15": {
                categoryKey: "cat32",
                title: "task 15",
                key: "t15",
                isDone: false
            },
            "t16": {
                categoryKey: "cat32",
                title: "task 16",
                key: "t16",
                isDone: true
            },
            "t17": {
                categoryKey: "cat32",
                title: "task 17",
                key: "t17",
                isDone: true
            },
            "t18": {
                categoryKey: "cat32",
                title: "task 18",
                key: "t18",
                isDone: false
            }
        }
    };

    save() {
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    setData(data) {
        this.data = data;
    }

    getAllData() {
        return this.data;
    }

    getAllCategoriesWithTasks() {
        let categories = [];
        // eslint-disable-next-line
        for (let [k, cat] of Object.entries(this.data.categories)) {
            if (!cat.categoryKey) {
                categories.push(cat);
            }
        }

        categories.forEach((parent) => {
            parent.children = [];
            // eslint-disable-next-line
            for (let [k, child] of Object.entries(this.data.categories)) {
                if (child.categoryKey === parent.key) {
                    parent.children.push(child);
                }
            }

            parent.tasks = [];
            // eslint-disable-next-line
            for (let [k, task] of Object.entries(this.data.tasks)) {
                if (task.categoryKey === parent.key) {
                    parent.tasks.push(task);
                }
            }
        });

        categories.forEach((parent) => {
            parent.children.forEach((child) => {
                child.tasks = [];
                // eslint-disable-next-line
                for (let [k, task] of Object.entries(this.data.tasks)) {
                    if (task.categoryKey === child.key) {
                        child.tasks.push(task);
                    }
                }
            });
        });

        return categories;
    }

    getTaskByKey(key) {
        return this.data.tasks[key];
    }

    getCategoryByKey(key) {
        return this.data.categories[key];
    }

    updateTask(task) {
        if (!task.key) {
            task.key = "t" + this.getRandomTaskKey();
        }
        this.data.tasks[task.key] = task;
        this.save();
    }

    getRandomInt() {
        return Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
    }

    getRandomTaskKey() {
        let num = this.getRandomInt();
        if (this.data.tasks["t" + num]) {
            num = this.getRandomTaskKey();
        }
        return num;
    }

    getRandomCategoryKey() {
        let num = this.getRandomInt();
        if (this.data.categories["cat" + num]) {
            num = this.getRandomTaskKey();
        }
        return num;
    }


    updateCategory(category) {
        if (!category.key) {
            category.key = "cat" + this.getRandomCategoryKey();
        }

        category = {
            key: category.key,
            title: category.title,
            categoryKey: category.categoryKey
        };

        this.data.categories[category.key] = category;
        this.save();
    }

    getProgress() {
        let completed = 0;
        // eslint-disable-next-line
        for (let [k, task] of Object.entries(this.data.tasks)) {
            if (task.isDone) {
                completed++;
            }
        }

        return parseInt((completed / Object.keys(this.data.tasks).length) * 100, 10);
    }
}

export default Server;
// Server emulation end