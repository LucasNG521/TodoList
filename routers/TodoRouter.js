const express = require('express');

class TodoRouter {
	constructor(todoService) {
		this.todoService = todoService;
	};

	router() {
		let router = express.Router();
		router.get("/:id", this.get.bind(this));
		router.get("/user/:id", this.getUser.bind(this));
		router.post("/", this.post.bind(this));
		// router.put("/:id", this.put.bind(this));
		router.patch("/:id", this.patch.bind(this));
		router.delete("/:id", this.delete.bind(this));
		return router;
	};


	get(req, res) {
		//Validation Logic
		return this.todoService.list(req.params.id)
			.then((data) => res.json(data.data))
			.catch((err) => res.status(500).json(err));
	};

	post(req, res) {
		return this.todoService.create(req.body)
			.then((data) => res.json(data.data))
			.catch((err) => res.status(500).json(err));
	};

	patch(req, res) {
		return this.todoService.update(req.params.id, req.body.todo_deadline)
			.then((data) => res.json(data.data))
			.catch((err) => res.status(500).json(err));
	};

	delete(req, res) {
		return this.todoService.delete(req.params.id)
			.then(() => res.send('Success'))
			.catch((err) => res.status(500).json(err));
	};

	getUser(req, res) {
		return this.todoService.user(req.params.id)
		.then((data) => res.json(Object.values(data.data).filter(u => u.user_id === Number(req.params.id))))
		.catch((err) => res.status(500).json(err));
	};

};

module.exports = TodoRouter;