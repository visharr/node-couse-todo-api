const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'vishal@example.com',
    password: 'password123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'donaldl@example.com',
    password: 'password123',

}]

const todos = [{
    _id: new ObjectID(),
    text: "First text todo"
}, {
    _id: new ObjectID(),
    text: "Second text todo",
    completed: "true",
    completedAt: 234
}];


const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
};

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);

    }).then(() => {
        done();
    });
}

module.exports = { todos, populateTodos, users, populateUsers }