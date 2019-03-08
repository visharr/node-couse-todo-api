const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5c8275a347d06e15ac4ec89f';
if (!ObjectID.isValid(id)) {
    console.log("ID not valid");
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo)
        return console.log('Id not Found');
    console.log('Todo by Id', todo);
}).catch((e) => {
    console.log(e);
});

User.findById('5c7e7054e3db1f29ecb1eaeb').then((user) => {
    if (!user)
        return console.log('Id not Found');
    console.log('User by Id', user);
}).catch((e) => {
    console.log(e);
});