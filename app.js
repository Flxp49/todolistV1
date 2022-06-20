const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();


let items = ["Buy Food", "Cook Food", "Eat Food"];
let work = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newitems: items
  });
})

app.post("/", function(req, res) {
  let item = req.body.newitem;
  console.log(req.body);
  if (req.body.list === "Work") {
    work.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newitems: work
  });

})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
