const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();
app.use(express.json()); //middleware
app.use(cors());
app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/todo", require("./routes/todoRoute"));
app.use("/api/v1/test", require("./routes/testRouter"));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`run on localhost ${PORT}`);
});
