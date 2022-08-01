const express = require("express");
const app = require("./app");
const port = process.env.PORT || 5000;

const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
