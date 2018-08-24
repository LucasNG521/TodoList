const express = require('express');

class TodoRouter {
	constructor(todoService) {
		this.todoService = todoService;
	};

	router() {
		let router = express.Router();
		router.post("/", this.post.bind(this));
		router.get("/:id", this.get.bind(this));
		// router.put("/:id", this.put.bind(this));
		router.patch("/:id", this.patch.bind(this));
		router.delete("/:id", this.delete.bind(this));
		router.get("/user/:id", this.getUser.bind(this));
		return router;
	};

	post(req, res) {
		return this.todoService.create(req.body)
			.then((data) => res.json(data.data))
			.catch((err) => res.json({ errMsg: err }));
	};

	get(req, res) {
		return this.todoService.list(req.params.id)
			.then((data) => res.json(data.data))
			.catch((err) => res.json({ errMsg: err }));
	};

	patch(req, res) {
		return this.todoService.update(req.params.id, req.body.todo_deadline)
			.then(() => {return this.todoService.list(req.params.id)})
			.then((data) => res.json(data.data))
			.catch((err) => res.json({ errMsg: err }));
	};

	delete(req, res) {
		return this.todoService.list(req.params.id)
			.then((data) => (!data.data) ? res.json(400, { errMsg: "DATA_DOES_NOT_EXIST" }) : this.todoService.delete(req.params.id))
			.then(() => this.todoService.list(req.params.id))
			.then((data) => (!data.data) ? res.json('Success') : res.json(400, { errMsg: "DELETE_FAILED" }))
			.catch((err) => res.json({'err': err}))
	};

	getUser(req, res) {
		return this.todoService.all(req.params.id)
		.then((data) => res.json(Object.values(data.data).filter(u => u.user_id === Number(req.params.id))))
		.catch((err) => res.json({ errMsg: err }));
	};

};

module.exports = TodoRouter;