const TodoRouter = require('../../routers/TodoRouter');
// const request = require('request');

let todoRouter;
let todoService;
let req;
let res;
let todolist = [{
  todo_id: 1,
  user_id: 1,
  todo_name: 'Breakfast',
  todo_deadline: 'morning',
  created_time: Date()
}, {
  todo_id: 2,
  user_id: 2,
  todo_name: 'Lunch',
  todo_deadline: 'noon',
  created_time: Date()
}, {
  todo_id: 3,
  user_id: 3,
  todo_name: 'Dinner',
  todo_deadline: 'evening',
  created_time: Date()
}];

describe("TodoRouter", () => {

  beforeEach(() => {
    todoService = jasmine.createSpyObj("todoService", {
      create: Promise.resolve({ data: [1] }),
      list: Promise.resolve({ data: todolist }),
      update: Promise.resolve({ data: [1] }),
      delete: Promise.resolve(),
      all: Promise.resolve({ data: todolist }),
    });

    todoRouter = new TodoRouter(todoService);
    todoRouter.router();
    req = jasmine.createSpyObj('req', ['params', 'query', 'body']);
    res = jasmine.createSpyObj('res', ['json']);
  });

  it("should run router method", () => {
    todoRouter.router();
  });

  it("should support post method", (done) => {
    todoRouter.post(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith([1]);
      done();
    });
  });

  it("should support get method", (done) => {
    todoRouter.get(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith(todolist);
      done()
    });
  });

  it("should support patch method", (done) => {
    todoRouter.patch(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith([1]);
      done();
    });
  });

  it("should support delete method", (done) => {
    todoRouter.delete(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith(400, Object({ errMsg: 'DELETE_FAILED' }));
      done();
    });
  });

  it("should support getUser method", (done) => {
    todoRouter.getUser(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith([]);
      done();
    });
  });

});