class TaskItem{
    constructor(name, assignTo, date, status, description){
        this.taskID = Math.floor(Math.random() * 1000000);
        this.name = name;
        this.assignTo = assignTo;
        this.date = date;
        this.status = status;
        this.description = description;
    }

    toObj(){
        let obj = {
            taskID: this.taskID,
            name: this.name,
            assignTo: this.assignTo,
            date: this.date,
            status: this.status,
            description: this.description
        }
        return obj;
    }
}

module.exports = {
    Item: TaskItem,
};