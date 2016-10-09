import express from "express";
import MangaSources from "../lib/MangaSources";

let PORT = process.env.PORT || 8100;
let app = express();

app.get("/", function (req, res) {
  res.send(MangaSources);
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}!`);
});