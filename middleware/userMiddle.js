let db = require('../data/userdb');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

exports.validateRegistration = (req, res, next) => {
    if (req.body.username === undefined ||
        req.body.password === undefined) {
            res.status(400).send('Invalid Form. Missing Username or Password.');
        } else {
            newUser = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                department: req.body.department === undefined ? 'Unassigned' : req.body.department
            }
                req.user = newUser;
                next();
        }
}

exports.validateToken = (req, res, next) => {
    console.log(req.headers);
    if (req.headers.authorization !== undefined) {
        jwt.verify(req.headers.authorization, 'SUPERSECRETPASSWORD', (err, decoded) => {
            if (err) {
                res.status(400).send(err);
            } else {
                next();
            }
        });
    } else {
        res.status(400).send('No Authorization Token Found.');
    }
}

exports.validateLogin = (req, res, next) => {
    if (req.body.username === undefined ||
        req.body.password === undefined) {
            res.status(400).send('Invalid Form. Missing Username or Password.');
        } else {
            req.user = req.body;
            next();
        }
}
