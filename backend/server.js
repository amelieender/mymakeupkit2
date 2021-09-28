const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(express.json({ limit: '25mb'}));

// enable cors for all requests
app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

require("./app/routes/makeup.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/sub.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
