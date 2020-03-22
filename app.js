const express = require("express");
const app = express();

bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const {routerIndex} = require('./routes/index')
app.use('/v1', routerIndex)


app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});
