const express = require("express");
const bodyParser = require("body-parser");
let router = require("./router.js");

let app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//static assets
app.use(express.static("css"));
app.use(express.static("images"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use("/", router);

app.listen(8000);
