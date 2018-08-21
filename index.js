// const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const todolist = [{
	todo_id: 1,
	user_id: 1,
	todo_name: 'Breakfast',
	todo_deadline: '22 aug 09:00',
	created_time: '21 aug 11:00'
}, {
	todo_id: 2,
	user_id: 1,
	todo_name: 'Lunch',
	todo_deadline: '22 aug 12:00',
	created_time: '21 aug 11:10'
}, {
	todo_id: 3,
	user_id: 1,
	todo_name: 'Dinner',
	todo_deadline: '22 aug 19:00',
	created_time: '21 aug 11:20'
}];

const apiRouter = express.Router();

//Create TodoList 
apiRouter.post('/todolist', (req, res) => {

	console.log(req.body);
	//Required minimum 4 chat
	if (!req.body.todo_name || req.body.todo_name.length < 4) {
		res.status(400).send('The name is required minimum 4')
		return;
	};

	const newtodolist = {
		todo_id: todolist.length + 1,
		user_id: req.body.user_id,
		todo_name: req.body.todo_name,
		todo_deadline: req.body.todo_deadline,
		created_time: Date()
	};

	// push the newtodolist in todolst
	todolist.push(newtodolist);

	// vvvv==== All TodoList ====vvvv
	// res.send(todolist) 
	res.json({ todo_id: newtodolist.todo_id })
});

//Get All TodoList
apiRouter.get('/todolist', (req, res) => {
	res.send(todolist)
});

//Read TodoList by id
apiRouter.get('/todolist/:todo_id', (req, res) => {
	// Find TodoId
	const todoitem = todolist.find(t => t.todo_id === parseInt(req.params.todo_id));
	if (!todoitem) res.status(404).send('Not Found');
	res.send(todoitem)
});

//Edit TodoList deadline
apiRouter.put('/todolist/:todo_id', (req, res) => {
	// Find TodoId
	const todoitem = todolist.find(t => t.todo_id === parseInt(req.params.todo_id));
	if (!todoitem) res.status(404).send('Not Found');

	// Change TodoDeadline
	todoitem.todo_deadline = req.body.todo_deadline;
	res.send(todoitem)
});

//Detele TodoList
apiRouter.delete('/todolist/:todo_id', (req, res) => {
	// Find TodoId
	const todoitem = todolist.find(t => t.todo_id === parseInt(req.params.todo_id));
	if (!todoitem) return res.status(404).send('Error : Not Found');

	// Find TodoId index
	const index = todolist.indexOf(todoitem);
	// Replace 1 ele from index number
	todolist.splice(index, 1)

	res.send('Success')
});

//Read TodoList by UserID
apiRouter.get('/usertodolist/:user_id', (req, res) => {
	// Find TodoId
	const user = todolist.filter(u => u.user_id === parseInt(req.params.user_id));
	if (!user) res.status(404).send('Not Found')
	res.send(user)
});


app.use('/api', apiRouter)

app.listen(8080);
console.log('listen on http://localhost:8080')