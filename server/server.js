var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

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



app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    },
        (e) => {
            res.status(400).send(e);
        }

    )
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Todo.findById(req.params.id).then((todo) => {
        if (todo)
            return res.send({ todo });
        res.status(404).send();
    },
        (e) => {
            res.status(400).send(e);
        }

    )
});

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(req.params.id).then((todo) => {
        if (todo)
            return res.send({ todo });
        res.status(404).send();
    },
        (e) => {
            res.status(400).send(e);
        }

    )
});

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

app.listen(port, () => {
    console.log('Started up on port', port);
});

module.exports = { app };


