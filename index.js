const express = require("express");
const app = express();
const port = 6789;

app.get("/tin-tuc", (req, res) => {
  res.send("Hello World 2!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
