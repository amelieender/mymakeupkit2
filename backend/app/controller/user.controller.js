const User = require("../model/user.model");

exports.register = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Member
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // Save Customer in the database
    User.register(user, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
            return;
        }
        else {res.send(data);
        }
        return;
    });
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.login(user, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred during login."
            });
        }
        else {
            return res.status(200).send(data);
        }
    });
};