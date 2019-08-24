class TaskList{
    constructor(){
        this.list = [];
    }

    addTask(taskItem){
        this.list.push(taskItem);
    }
}

class TaskItem{
    constructor(name, date, description){
        this.name = name;
        this.date = date;
        this.description = description;
    }
}

module.exports = {
    List: TaskList,
    Item: TaskItem
};