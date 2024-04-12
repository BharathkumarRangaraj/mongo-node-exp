const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
const dbase = require("./db.js");

app.engine(
  "hbs",
  exhbs.engine({ layoutsDir: "views/", defaultLayout: "main", extname: "hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", async (req, res) => {
  let message = "test";
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  const cursor = collection.find({});
  const employees = await cursor.toArray();
  res.render("main", { message, employees });
});

app.listen(8000, () => {
  console.log("running port 8000");
});
