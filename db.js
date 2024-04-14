const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId();

let database;
async function getDatabase() {
  //created lb and added the below mongodb lbrary->books
  //db.books.insetMany([ { title: 'harry poter', author: 'jk rowling' }, { title: 'power of subcon mind', author: 'don' }] )
  const client = await mongodbClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("library");
  if (!database) {
    console.log("database not found");
  }
  return database;
}
module.exports = {
  getDatabase,
  ObjectID,
};
