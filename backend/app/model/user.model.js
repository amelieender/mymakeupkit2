const { sha256 } = require('js-sha256');
const jwt = require('jsonwebtoken');

const con = require('./db.js');
const jwtSigningSecret = require('../../config/jwt-secret');

// constructor
const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.register = (user, res) => {
    try {
        let { username, email, password } = user;
        const hashed_password = sha256(password.toString());
        const checkUsername = `Select username FROM users WHERE username = ?`;
        con.query(checkUsername, [username], (err, result, fields) => {
            if (!result.length) {
                const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
                con.query(
                    sql, [username, email, hashed_password],
                    (err, result) =>{
                        if (err) {
                            res(err, null);
                        } else{
                            let token = jwt.sign({ data: result }, jwtSigningSecret);
                            res(null, { status: 1, data: result, token : token });
                        }
                    })
            } else {
                res(Error('Username already exists!'), null);
            }
        });
    } catch (error) {
        res(error, null);
    }
}

User.login = (user, res) => {
    try {
        let { username, password } = user;
        const hashed_password = sha256(password.toString());
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
        con.query(
            sql, [username, hashed_password],
            function(err, result) {
                if (err) {
                    res(err, null);
                } else {
                    if (!result.length) {
                        res(Error('Username or password wrong!'), null);
                        return;
                    }
                    let token = jwt.sign({ data: result }, jwtSigningSecret);
                    res(null, { status: 200, data: result, token: token });
                }
            })
    } catch (error) {
        res(error, null);
    }
}

module.exports = User;