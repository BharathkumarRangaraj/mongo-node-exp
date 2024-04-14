const express = require("express");
const app = express();
//to pass nput as prop value
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
const dbase = require("./db.js");
//doc stroed as _id=objectID('id number') for this template below used
const ObjectID = dbase.ObjectID;

app.engine(
  "hbs",
  exhbs.engine({ layoutsDir: "views/", defaultLayout: "main", extname: "hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");
//to make express app as mddleware
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  const cursor = collection.find({});
  const books = await cursor.toArray();

  let message = "";

  var edit_id, edit_book;

  //update ops
  if (req.query.edit_id) {
    edit_id = req.query.edit_id;

    edit_book = await collection.findOne({ _id: ObjectID(edit_id) });
  }

  //delete ops
  if (req.query.delete_id) {
    await collection.deleteOne({ _id: ObjectID(req.query.delete_id) });
    return res.redirect("/?status=2");
  }

  switch (req.query.status) {
    case "1":
      message = "nserted succesfully";

      break;
    case "2":
      message = "updated succesfully";

      break;
    case "3":
      message = "deleteted succesfully";

      break;

    default:
      break;
  }
  res.render("main", { message, books });
});

app.post("/store_book", async (req, res) => {
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  //to get form datas
  let book = { title: req.body.title, author: req.body.author };
  await collection.insertOne(book);
  return res.redirect("/?status=1");
});

//update
app.post("/update_book/:edit_id", async (req, res) => {
  const database = await dbase.getDatabase();
  const collection = database.collection("books");
  //to get form datas
  let book = { title: req.body.title, author: req.body.author };
  let edit_id = req.params.edit_id;
  await collection.updateOne({ _id: ObjectID(edit_id) }, { $set: book });
  return res.redirect("/?status=2");
});

app.listen(8000, () => {
  console.log("running port 8000");
});
