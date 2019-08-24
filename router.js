const router = require("express").Router();
const Task = require("./taskClass.js");

let taskDB = new Task.List();

router.get("/", function(req, res){
    res.render("index.html");
});

router.get("/newTask", function(req, res){
    res.render("addTask.html");
});

router.post("/newTaskData", function(req, res){
    let taskItem = new Task.Item(req.body.taskName, req.body.taskDueDate, req.body.taskDescription);
    taskDB.addTask(taskItem);
    res.send("Task added!"); //should redirect to another page/pop-up message instead
});

router.get("/listTasks", function(req, res){
    res.render("listTasks.html", {
        taskList: taskDB.list
    });
});

module.exports = router;