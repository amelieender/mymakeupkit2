const MakeupItem = require("../model/makeup.model");

// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Member
    const item = new MakeupItem({
        productname: req.body.productname,
        brandname: req.body.brandname,
        category: req.body.category,
        opened: req.body.opened,
        durability: req.body.durability
    });

    // Save Customer in the database
    MakeupItem.create(item, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Member."
            });
        else res.send(data);
    });
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
    MakeupItem.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MakeupItem with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MakeupItem with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MakeupItem.updateById(
        req.params.id,
        new MakeupItem(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found MakeupItem with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating MakeupItem with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
    MakeupItem.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MakeupItem with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete MakeupItem with id " + req.params.id
                });
            }
        } else res.send({ message: `MakeupItem was deleted successfully!` });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    MakeupItem.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all makeupItems."
            });
        else res.send({ message: `All makeupItems were deleted successfully!` });
    });
};