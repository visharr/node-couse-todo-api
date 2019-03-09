const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


Todo.deleteMany({}).then((todos) => {
    console.log('Todos', todos);
});

// Todo.findOneAndDelete({ _id: '5c8386a876595620e84d0a77' }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findByIdAndDelete('5c83865cb0916319382e82e1').then((todo) => {
//     if (!todo)
//         return console.log('Id not Found');
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

