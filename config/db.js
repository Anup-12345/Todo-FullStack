const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.log(`mongodb error ${error}`);
  }
};
module.exports = connectDB;
