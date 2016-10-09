import express from "express";

let PORT = process.env.PORT || 8100;
let app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}!`);
});