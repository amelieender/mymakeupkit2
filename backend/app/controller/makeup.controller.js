const MakeupItem = require("../model/makeup.model");

// Create and Save a new Member
exports.create = (req, res) => {

};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    MakeupItem.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving members."
            });
        else res.send(data);
    });
};

// Find a single Member with a memberId
exports.findOne = (req, res) => {

};

// Update a Member identified by the memberId in the request
exports.update = (req, res) => {

};

// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {

};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {

};