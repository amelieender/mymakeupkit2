module.exports = app => {
    const {SubscriptionController} = require("../controller/sub.controller.js");

    app.post("/subscription", SubscriptionController.subscribe);
};
