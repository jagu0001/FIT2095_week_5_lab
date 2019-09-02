const router = require("express").Router();
const Task = require("./taskList");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let url = "mongodb://localhost:27017";
const collectionName = "Week-6-Task-List";
let db;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) throw err;
    db = client.db("FIT2095-Week-6-Workshop");
});


router.get("/", function(req, res){
    res.render("index.html");
});


router.get("/newTask", function(req, res){
    res.render("addTask.html");
});


router.post("/newTaskData", function(req, res){
    let taskItem = new Task.Item(req.body.taskName, req.body.assignTo, 
        req.body.taskDueDate, req.body.taskStatus, req.body.taskDescription);
    
    db.collection(collectionName).insertOne(taskItem.toObj());
    res.redirect("/listTasks");
});


router.get("/listTasks", function(req, res){
    db.collection(collectionName).find({}).toArray(function(err, result){
        if(err) res.send("An error has occurred");
        res.render("listTasks.html", {
            taskList: result
        });
    })
});


router.get("/deleteTaskPage", function(req, res){
    res.sendFile(__dirname + "/views/deleteTask.html");
});


router.post("/deleteTask", function(req, res){
    let idToDelete = parseInt(req.body.idToDelete);
    let filter = {
        taskID: idToDelete
    };

    db.collection(collectionName).deleteOne(filter, function(err, result){
        if(result.deletedCount > 0){
            res.redirect("/listTasks");
        }
        else{
            res.send("Specified task not found");
        } 
    });
});


router.get("/deleteCompletedPage", function(req, res){
    res.sendFile(__dirname + "/views/deleteCompleted.html");
})


router.post("/deleteCompleted", function(req, res){
    let filter = {
        status: "Completed"
    }

    db.collection(collectionName).deleteMany(filter);
    res.redirect("/listTasks");
});


router.get("/updateTaskPage", function(req, res){
    res.sendFile(__dirname + "/views/updateTask.html");
})


router.post("/updateTask", function(req, res){
    let updateID = parseInt(req.body.idToUpdate);
    let newStatus = req.body.updateStatus;
    let filter = {
        taskID: updateID
    };

    db.collection(collectionName).updateOne(filter, {$set: { status: newStatus }}, {upsert: false}, 
        function(err, result){
            if(err) throw err;
            res.redirect("/listTasks");
    });
});


module.exports = router;