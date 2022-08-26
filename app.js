const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/users");

app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/users`, userRoutes);

main().catch((err) => console.log(err, "ERROR"));

async function main() {
  await mongoose.connect(process.env.CONNECTION_URL);
  console.log("SUCCESS!");
}

app.listen(3000, () => {
  console.log("Running on 3000");
});
