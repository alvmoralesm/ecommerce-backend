const express = require("express");
const app = express();
require("dotenv/config");
const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Running on 3000");
});
