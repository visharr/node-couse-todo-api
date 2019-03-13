const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo ', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });


    it('should not create todo with invalid data ', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos ', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc ', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('First text todo');
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non object ids', (done) => {
        request(app)
            .get(`/todos/abc`)
            .expect(404)
            .end(done);
    });

});

describe('GET /todos/:id', () => {
    it('should return delete a todo ', (done) => {
        var id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('First text todo');
            })
            .end((err, res) => {
                if (err)
                    return done(err);

                Todo.findById(id).then((todo) => {
                    expect(todo).toBe(null);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non object ids', (done) => {
        request(app)
            .delete(`/todos/abc`)
            .expect(404)
            .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('should update a todo ', (done) => {
        var id = todos[0]._id.toHexString();
        request(app)
            .patch(`/todos/${id}`)
            .send({ "text": "updated todo", "completed": true })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('updated todo');
                expect(typeof res.body.todo.completedAt).toBe('number');
                expect(res.body.todo.completed).toBe(true);
            })
            .end(done);
    });

    it('should clear completed at when todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${id}`)
            .send({ "text": "updated todo" })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('updated todo');
                expect(res.body.todo.completedAt).toBe(null);
                expect(res.body.todo.completed).toBe(false);
            })
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .patch(`/todos/abc`)
            .expect(404)
            .end(done);
    });

});

describe('GET /users/me', () => {
    it('should return user if authenticated ', (done) => {

        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a new user ', (done) => {
        var email = 'example@example.com';
        var password = 'tst123'

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.find({ email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e) => done(e));
            })
    });


    it('should return validation error if request invalid', (done) => {
        var email = 'eddm';
        var password = 'tsd3'
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = 'examsple@example.com';
        var password = 'tstdddd123'

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done)
    });    

});