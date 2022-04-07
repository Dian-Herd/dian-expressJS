const mongoose = require("mongoose");

mongoose.connect("mongodb://dianMongoose:rahasia@localhost:27017/dian-store?authSource=admin");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Not Connected :"));
db.once("open", () => console.log("Database connected . . ."));