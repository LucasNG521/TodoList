const axios = require('axios');

module.exports = class TodoService {
	constructor(axios) {
		this.axios = axios;
	};

	// Create TodoList
	create(reqData) {
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

	// List all TODO items by id
	user(id) {
		return axios.get('https://todolist-91688.firebaseio.com/todolist.json')
		// .then((data) => Object.values(data.data).filter(u => u.user_id === id)) //parseInt(req.params.user_id)))
	};

};