const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$NeEhOMatfZG65fQKmakoAeByLGTM8LTHRHSHhbGceXxcJ1CB.7m4m'

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})

// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc')

// var decoded = jwt.verify(token, '123abc', function (err, decoded) {
//     if (err) console.log("bla bla bla")
//     else return decoded;
// })

// console.log(JSON.stringify(decoded));

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