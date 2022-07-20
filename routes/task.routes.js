const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

//  POST /api/tasks  -  Creates a new task
router.post('/tasks', (req, res, next) => {
	const { title, description, projectId } = req.body;

	Task.create({ title, description, project: projectId })
		.then((newTask) => {
			return Project.findByIdAndUpdate(projectId, {
				$push: { tasks: newTask._id }
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
});

// PUT  /api/tasks/:taskId  - Updates a specific task by id
router.put('/tasks/:taskId', (req, res, next) => {
	const { taskId } = req.params;
	const { inputTitle, inputDescription } = req.body;
	const title = inputTitle;
	const description = inputDescription;
	

	if (!mongoose.Types.ObjectId.isValid(taskId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Task.findByIdAndUpdate(
		taskId,
		{ title, description },
		{ new: true }
	)
		.then(() => {
			res.send(req.body);
		})
		.catch((err) => res.json(err));
});

//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
router.delete('/tasks/:taskId', (req, res, next) => {
	const { taskId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(taskId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Task.findByIdAndRemove(taskId)
		.then(() => res.json({ message: `Task with ${taskId} is removed successfully.` }))
		.catch((error) => res.json(error));
});

module.exports = router;
