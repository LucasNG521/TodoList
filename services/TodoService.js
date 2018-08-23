const axios = require('axios');

module.exports = class TodoService {
	constructor() {

	};

	// Create TodoList
	create(reqData) {
		/* 
			Simple Invalidation 
			========================
			- if user_id or todo_name are null/undefined or if todo_name is empty string
			  return invalid input message
			- todo_deadline can be null
		*/
		if (!reqData.user_id || !reqData.todo_name || reqData.todo_name.trim() === "") {
			return new Promise((resolve, reject) => {
				throw "INVALID_INPUT";
			});
		}
		return axios.post('https://todolist-91688.firebaseio.com/todolist.json', {
			user_id: reqData.user_id,
			todo_name: reqData.todo_name,
			todo_deadline: reqData.todo_deadline,
			created_time: Date()
		});
	};

	// Read a TODO Item by id
	list(id) {
		return axios.get(`https://todolist-91688.firebaseio.com/todolist/${id}.json`);
	};

	// Change the Deadline of a TODO item
	update(id, todo_deadline) {
		return axios.patch(`https://todolist-91688.firebaseio.com/todolist/${id}.json`, {
			todo_deadline: todo_deadline
		});
	};

	// Delete a TODO item
	delete(id) {
		return axios.delete(`https://todolist-91688.firebaseio.com/todolist/${id}.json`);
	};

	// List all TODO items
	all() {
		return axios.get('https://todolist-91688.firebaseio.com/todolist.json');
	};

};