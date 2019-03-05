var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

app.listen(3000, () => {
    console.log('started on port 3000');
});

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    });
});

// app.post('/todos', (req, res) => {

// });

// var newTodo = new Todo({
//     text: 'learn coding',
//     completed: 'true',
//     completedAt: 123
// });


// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//     console.log('Unable to save Todo');
// });



// var newUser = new User({
//     email: "suck a backchod.com"
// });


// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//     console.log('Unable to save User', e);
// });