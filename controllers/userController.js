let bcrypt = require('bcryptjs');
let db = require('../data/userdb');
let jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    db.register(req.user).then(user => {
        if (user.username) {
            res.status(200).send('Success!');
        } else {
            res.status(400).send('Something Went Wrong!');
        }
    });
}

exports.login = (req, res) => {
    let token = jwt.sign({username: req.user.username}, 'SUPERSECRETPASSWORD');
    db.login(req.user.username).then(user => {
        if (user.password !== undefined && bcrypt.compareSync(req.user.password, user.password)) {
            res.status(200).send({message: 'Welcome!', token: token});
        } else {
            res.status(200).send('Invalid Username or Password');
        }
    })
}

exports.getUsers = (req, res) => {
    db.getUsers().then(users => {
        res.status(200).send(users);
    });
}