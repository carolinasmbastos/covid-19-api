const app = require('./app');

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});

// app.listen( 8080 , () => {
//     console.log('Listening to 8080!');
// })