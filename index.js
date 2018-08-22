const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const TodoRouter = require('./routers/TodoRouter');
const  TodoService = require('./services/TodoService');

const app = express();

app.use(bodyParser.json());

let todoService = new TodoService(axios);

app.use('/api',new TodoRouter(todoService).router());

app.listen(8080, () => {
    console.log('server running at http://localhost:8080')
});