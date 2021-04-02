module.exports = app => {
    const user = require("../controller/user.controller.js");

    // Create a new User
    app.post("/register", user.register);

    // login
    app.post("/login", user.login);
};
