const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')

var decoded = jwt.verify(token, '123abc', function (err, decoded) {
    if (err) console.log("bla bla bla")
    else return decoded;
})
console.log(JSON.stringify(decoded));
// var message = "I am user no 3";

// var hash = SHA256(message).toString();
// console.log(hash);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret text').toString()
// }