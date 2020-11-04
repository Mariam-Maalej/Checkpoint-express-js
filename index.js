const express = require("express");
const app = express();
const port = process.env.port || 4000;
//Middleware time
const timeCheck = (req, res, next) => {
  const date = new Date();
  const hour = date.getHours();
  const day = date.getDate();
  if (day >= 0 && day <= 4 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send(
      "Sorry ! Server is available only between Monday and Friday from 9 to 17"
    );
  }
};
app.use(express.static("public"));
app.use(timeCheck);
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/services", function (req, res) {
  res.render("services");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});

//Port listening
app.listen(port, (error) => {
  if (error) console.log("Connection failed !");
  else
    console.log(
      "The server is running, " +
        " please, open your browser at http://localhost:%s",
      port
    );
});
