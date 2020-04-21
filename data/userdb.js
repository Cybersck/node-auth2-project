const db = require('./dbconfig');

module.exports = {
    getUsers,
    getById,
    register,
    login
}

function getUsers() {
    return db('users');
}

function getById(id) {
    return db('users').where({id}).first();
}

function register(user) {
    return db('users').insert(user).then(ids => {
        return getById(ids[0]);
    });
}

function login(username) {
    return db('users').where('username', username).first();
}