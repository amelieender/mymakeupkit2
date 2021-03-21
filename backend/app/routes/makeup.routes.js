module.exports = app => {
    const makeup = require("../controller/makeup.controller.js");

    // Create a new Member
    app.post("/makeup", makeup.create);

    // GET all makeup
    app.get("/makeup", makeup.findAll);

    // GET one single Member with memberId
    app.get("/makeup/:id", makeup.findOne);

    // Update one Member with memberId
    app.put("/makeup/:id", makeup.update);

    // Delete the Member with memberId
    app.delete("/makeup/:id", makeup.delete);

    // Delete all makeup
    app.delete("/makeup", makeup.deleteAll);
};
