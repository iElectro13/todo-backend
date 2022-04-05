const { response } = require("express");
const express = require("express");
const task = require("../models/task");
const taskSchema = require("../models/task");

const router = express.Router();

//Get tasks
router.get("/tasks", (request, response) => {
    taskSchema
        .find()
        .then((data) => response.json(data))
        .catch((err) => response.json(err));
});

//Get task by id
router.get("/tasks/:id", (request, response) => {
    const { id } = request.params;
    taskSchema
    .findById(id)
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
});

//Create new task
router.post("/tasks/new", (request, response) => {
    const task = taskSchema(request.body);
    task.save()
        .then((data) => response.json(data))
        .catch((err) => response.json(err));
});

//Update task by id
router.put("/tasks/update/:id", (request, response) => {
    const { id } = request.params;
    taskSchema
    .updateOne({_id:id}, {$set: request.body})
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
});

//Check task
router.put("/tasks/check/:id", (request, response) => {
    const { id } = request.params;
    const task = taskSchema.findById(id)
    taskSchema
    .updateOne({_id:id}, {$set: {isDone: !task.isDone}})
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
});

//Delete task by id
router.delete("/tasks/delete/:id", (request, response) => {
    const { id } = request.params;
    taskSchema
    .deleteOne({_id:id})
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
});

module.exports = router;