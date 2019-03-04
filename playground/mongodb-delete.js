// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp')

    //delete many
    // db.collection('Todos').deleteMany({
    //     "text": "eat dinner"
    // }).then((result) => {
    //     console.log(result);
    // });

    //delete none
    // db.collection('Todos').deleteOne({
    //     text: "eat dinner"
    // }).then((result) => {
    //     console.log(result);
    // });

    //find one delete it
    db.collection('Todos').findOneAndDelete({
        text: "something to do"
    }).then((result) => {
        console.log(result);
    });

    // client.close();
});