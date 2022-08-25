const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//Routes
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

const api = process.env.API_URL;

app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoryRoutes);

main().catch((err) => console.log(err, "ERROR"));

async function main() {
  await mongoose.connect(process.env.CONNECTION_URL);
  console.log("SUCCESS!");
}

app.listen(3000, () => {
  console.log("Running on 3000");
});
