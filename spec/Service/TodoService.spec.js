const TodoService = require('../../services/TodoService');
const axios = require('axios');

describe("TodoService", () => {
	let todoService;
	let example = {
		user_id: 100,
		todo_name: 'name',
		todo_deadline: 'deadline',
	};

	beforeEach(() => {
		todoService = new TodoService();
	});

	it("should support create method", (done) => {
		todoService.create(example)
			.then((data) => {
				// expect return ( todo_id )
				expect(Object.keys(data.data).length).toEqual(1);
				expect(Object.keys(data.data)).toEqual(['name']);

				// expect return Todo id lenght = 20
				expect((Object.values(data.data)).join().length).toEqual(20)
				done();
			})
		//after testing should delete the todo list
	});

	it("should support list method", (done) => {
		todoService.create(example)
			// create a example TodoList and return the ( todo_id ) to list method
			.then((data) => todoService.list(Object.values(data.data).join()))
			.then((data) => {
				expect(Object.keys(data.data).length).toEqual(4);
				expect(data.data.user_id).toEqual(100);
				expect(data.data.todo_name).toEqual('name');
				expect(data.data.todo_deadline).toEqual('deadline');
				done()
			})
		//after testing should delete the todo list
	});

	it("should support update method", (done) => {
		todoService.create(example)
			.then(data => todoService.update(Object.values(data.data).join(), 'new_todo_deadline'))
			.then((data) => {
				expect((Object.values(data.data)).join()).toEqual('new_todo_deadline')
				done()
			})
		//after testing should delete the todo list
	});

	it("should support delete method", (done) => {
		todoService.create(example)
			.then(({ data }) => todoService.delete(Object.values(data).join()))
			.then(({ data }) => {
				expect(data).toEqual(null);
				done();
			});
	});

	it("should support all method", (done) => {
		todoService.all()
			.then(({ data }) => {
				expect(Object.values(data).length).toEqual(jasmine.any(Number))
				done()
			});
	});

});
