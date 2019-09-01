const router = require("express").Router();
const Task = require("./taskList");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const dbCollectionName = "Week-6-Task-List";
let url = "mongodb://localhost:27017";
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
    
    db.collection(dbCollectionName).insertOne(taskItem.toObj());
    res.redirect("/listTasks");
});


router.get("/listTasks", function(req, res){
    db.collection(dbCollectionName).find({}).toArray(function(err, result){
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
    
});


router.post("deleteCompleted", function(req, res){

});


router.post("updateTask", function(req, res){

});


module.exports = router;