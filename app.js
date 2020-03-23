const express = require("express");
const app = express();

bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const {routerIndex} = require('./routes/index')
app.use('/v1', routerIndex)


let errorHandler = (error, req, res, next) => {
    res.status((error.status != undefined ? error.status : "500"));
    res.send(error.message)
}

app.use(errorHandler);

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});
