const mongoose = require("mongoose");

const mongoURI = process.env.NODE_APP_MONGO_URI;

if (!mongoURI) {
  throw new Error("Mongo URI missing");
}

let DB;

const connectDB = async () => {
  try {
    DB = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message, mongoURI);
    process.exit(1);
  }
};

const getDbConnection = async () => {
  if (!DB) DB = await connectDB();

  return DB.connection;
};

connectDB();

module.exports = {
  getDbConnection,
};
