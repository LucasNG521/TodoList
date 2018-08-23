const TodoRouter = require('../../routers/TodoRouter');
// const request = require('request');

describe("TodoRouter", () => {
  let todoRouter;
  let todoService;
  let req;
  let res;
  let todolist = [{
    todo_id: 1,
    user_id: 1,
    todo_name: 'Breakfast',
    todo_deadline: '22 aug 09:00',
    created_time: 'Wed Aug 22 2018 15:36:02 GMT+0800 (Hong Kong Standard Time)'
  }, {
    todo_id: 2,
    user_id: 2,
    todo_name: 'Lunch',
    todo_deadline: '22 aug 12:00',
    created_time: 'Wed Aug 22 2018 15:36:02 GMT+0800 (Hong Kong Standard Time)'
  }, {
    todo_id: 3,
    user_id: 3,
    todo_name: 'Dinner',
    todo_deadline: '22 aug 19:00',
    created_time: 'Wed Aug 22 2018 15:36:02 GMT+0800 (Hong Kong Standard Time)'
  }];

  beforeEach (() => {
    todoService = jasmine.createSpyObj("todoService", {
      create: Promise.resolve({data: [1]}),
      list: Promise.resolve({data: todolist}),
      update: Promise.resolve({data: [1]}),
      delete: Promise.resolve(),
      user: Promise.resolve({data: todolist}),
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
      expect(res.json).toHaveBeenCalledWith('Success');
      done();
    });
  });

  it("should support getUser method", (done) => {
    todoRouter.getUser(req, res).then(() => {
      expect(res.json).toHaveBeenCalledWith([]);
      done();
    });
  });

  // it("get method should return status 200", (done) => {
  //   request.get("http://localhost:8080/api/1", (error, response) => {
  //     expect(response.statusCode).toEqual(200);
  //     done();
  //   });
  // });

  // it("getUser method should return status 200", (done) => {
  //   request.get("http://localhost:8080/api/user/1", (err, res) => {
  //     expect(res.statusCode).toEqual(200);
  //     done()
  //   });
  // });

});

// describe("Multiple spies, when created manually", function () {
//   var tape;

//   beforeEach(function () {
//     tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

//     tape.play();
//     tape.pause();
//     tape.rewind(0);
//   });

//   it("creates spies for each requested function", function () {
//     expect(tape.play).toBeDefined();
//     expect(tape.pause).toBeDefined();
//     expect(tape.stop).toBeDefined();
//     expect(tape.rewind).toBeDefined();
//   });
// });