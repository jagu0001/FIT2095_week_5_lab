const router = require("express").Router();
const TaskClass = require("./taskList");

router.get("/", function(req, res){
    res.render("index.html");
});


router.get("/newTask", function(req, res){
    res.render("addTask.html");
});


router.get("/newDev", function(req, res){
    res.render("addDev.html");
})


router.post("/newTaskData", function(req, res){
    let name = req.body.taskName;
    let devID = req.body.assignToDevID;
    let dueDate = req.body.taskDueDate;
    let status = req.body.taskStatus;
    let description = req.body.taskDescription;

    let task = new TaskClass.Task(name, devID, dueDate, status, description);
    task.saveToDB();
    res.redirect("/listTasks");
});


router.post("/newDevData", function(req, res){
    let name = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    let level = req.body.level;
    let address = {
        state: req.body.state,
        suburb: req.body.suburb,
        street: req.body.street,
        unit: req.body.unit
    };

    let dev = new TaskClass.Developer(name, level, address);
    dev.saveToDB();
    res.redirect("/listDevs");
});


router.get("/listDevs", function(req, res){
    let developers = TaskClass.Developer.find({});
    developers.then(function(devArray){
        res.render("listDevs.html", {devList: devArray}); 
    });
})


router.get("/listTasks", function(req, res){
    let tasks = TaskClass.Task.find({});
    tasks.then(function(taskArray){
        res.render("listTasks", {taskList: taskArray});
    })
});


router.get("/deleteTaskPage", function(req, res){
    res.sendFile(__dirname + "/views/deleteTask.html");
});


router.post("/deleteTask", function(req, res){
    let taskID = req.body.idToDelete;
    TaskClass.Task.deleteByID(taskID);
    res.redirect("/listTasks");
});


router.get("/deleteCompletedPage", function(req, res){
    res.sendFile(__dirname + "/views/deleteCompleted.html");
})


router.post("/deleteCompleted", function(req, res){
    TaskClass.Task.deleteCompleted();
    res.redirect("/listTasks");
});


router.get("/updateTaskPage", function(req, res){
    res.sendFile(__dirname + "/views/updateTask.html");
})


router.post("/updateTask", function(req, res){
    let taskID = req.body.idToUpdate;
    let newStatus = req.body.updateStatus;
    TaskClass.Task.updateStatus(taskID, newStatus);
    res.redirect("/listTasks");
});


module.exports = router;