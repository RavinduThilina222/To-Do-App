const express = require('express');
const ToDoController = require('./../controller/ToDo.controller');


const router = express.Router();

// Create a new ToDo
router.post('/', ToDoController.createToDo);

// Get all ToDos
router.get('/', ToDoController.getAllToDos);

// Get a single ToDo by ID
router.get('/:id', ToDoController.getToDoById);

// Update a ToDo's description by ID
router.put('/:id/description', ToDoController.updateToDoDescription);

// Update a ToDo's completion status by ID
router.put('/:id/completion', ToDoController.updateToDoCompletion);

// Delete a ToDo by ID
router.delete('/:id', ToDoController.deleteToDo);

module.exports = router;