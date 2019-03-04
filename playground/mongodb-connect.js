// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB Server');
        return;
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Unable to insert todo', err);
    //         return;
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Vishal',
    //     age: 25,
    //     address: "Pilani"
    // }, (err, result) => {
    //     if (err) {

    //         console.log('Unable to insert todo', err);
    //         return;
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});