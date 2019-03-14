var { User } = require('../models/user');
const bcrypt = require('bcryptjs');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

// var authenticatePassword = (req, res, next) => {

//     User.findOne({ email: req.body.email }).then((user) => {
//         if (!user) {
//             return Promise.reject();
//         }

//         bcrypt.compare(req.body.password, user.password, (err, response) => {
//             if (err) {
//                 res.status(400).send();
//             }
//             if (!response)
//                 res.status(401).send();
//         });



//         req.user = user;
//         next();
//     }).catch((e) => {
//         res.status(401).send();
//     });
// }

module.exports = { authenticate };