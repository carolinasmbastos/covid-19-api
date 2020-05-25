const app = require('./app');

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});
