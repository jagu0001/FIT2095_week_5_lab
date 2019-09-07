const mongoose = require("mongoose");
const Developer = require("./developer");
const Task = require("./task");

class SchemaClass{
    constructor(){
        this.schema;
    }

    saveToDB(){
        this.schema.save(function(err){
            if(err) throw err;
            console.log("Saved to DB");
        });
    }
}

class DevClass extends SchemaClass{
    constructor(fullName, skillLevel, fullAddress){
        super();
        let devOptions = {
            _id: new mongoose.Types.ObjectId,
            name: fullName,
            level: skillLevel,
            address: fullAddress
        }
        this.schema = new Developer(devOptions);
    }

    static find(query){
        return Developer.find(query).exec();
    }
}


class TaskClass extends SchemaClass{
    constructor(taskName, devID, taskDueDate, taskStatus, taskDesc){
        super();
        let taskOptions = {
            _id: new mongoose.Types.ObjectId,
            name: taskName,
            assignTo: devID,
            dueDate: taskDueDate,
            status: taskStatus,
            description: taskDesc
        }
        this.schema = new Task(taskOptions);
    }

    static find(query){
        return Task.find(query).exec();
    }

    static deleteByID(taskID){
        Task.deleteOne({"_id": taskID}, function(err){
            if(err) throw err;
        });
    }

    static deleteCompleted(){
        Task.deleteMany({"status": "Completed"}, function(err){
            if(err) throw err;
        });
    }

    static updateStatus(taskID, newStatus){
        Task.updateOne({"_id": taskID}, {$set: {"status": newStatus}}, function(err){
            if(err) throw err;
        });
    }
}

module.exports = {
    Task: TaskClass,
    Developer: DevClass
}