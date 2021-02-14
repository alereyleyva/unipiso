const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Configurations
const mongoose_config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.set("useFindAndModify", false);
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("API de DiscoNet AppWeb");
});
app.use("/users", require("./Users/UserRouter"));
app.use("/gastos", require("./Gastos/GastosRouter"));
app.use("/items", require("./Items/ItemRouter"));

// Connection to DB
mongoose
  .connect(
    process.env.MONGODB_URI || `mongodb://localhost:27017/UniPisoDB`,
    mongoose_config
  )
  .then(() => {
    console.log("Connection to the UniPiso DB is successful!");
  })
  .catch((err) => console.error(err));

// Server Initialization
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server on port", port);
});

module.exports = app;
