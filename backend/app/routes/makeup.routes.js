const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();

const jwtSigningSecret = require('../../config/jwt-secret');

module.exports = app => {
    const makeup = require("../controller/makeup.controller.js");

    // router.use(jwt({ secret: jwtSigningSecret, algorithms: ['HS256'] }), (err, req, res, next) => {
    //     if (err.name === 'UnauthorizedError') {
    //         res.status(401).send('invalid token...');
    //     } else {
    //         next();
    //     }
    // })

    // Create a new Member
    router.post("/", makeup.create);

    // GET all makeup
    router.get("/", makeup.findAll);

    // GET one single Member with memberId
    router.get("/:id", makeup.findOne);

    // Update one Member with memberId
    router.put("/:id", makeup.update);

    // Delete the Member with memberId
    router.delete("/:id", makeup.delete);

    // Delete all makeup
    router.delete("/", makeup.deleteAll);

    app.use('/makeup', router);
};
