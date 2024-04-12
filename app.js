const express = require("express");
const app = express();
//to pass nput as prop value
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
const dbase = require("./db.js");

app.engine(
  "hbs",
  exhbs.engine({ layoutsDir: "views/", defaultLayout: "main", extname: "hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");
//to make express app as mddleware
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let message = "";

  switch (req.query.status) {
    case "1":
      message = "nserted succesfully";

      break;

    default:
      break;
  }
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  const cursor = collection.find({});
  const employees = await cursor.toArray();
  res.render("main", { message, employees });
});

app.post("/store_book", async (req, res) => {
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  //to get form datas
  let book = { title: req.body.title, author: req.body.author };
  await collection.insertOne(book);
  return res.redirect("/?status=1");
});
app.listen(8000, () => {
  console.log("running port 8000");
});
