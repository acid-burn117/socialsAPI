const connection = require("../config/connection");
const { user, thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Now connected to database.");

  await user.deleteMany({});
  await thought.deleteMany({});
  await user.collection.insertMany(users);
  await thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete!");
  process.exit(0);
});
