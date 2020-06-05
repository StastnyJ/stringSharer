const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);

app.use(express.static("static"));
app.use(bodyParser.text());

let PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const key = req.query.key;
  if (key === null || key === undefined || key.length === 0) {
    res.status(400);
    res.send();
  } else {
    const data = require("./data.json");
    res.json(data[key]);
  }
});

app.post("/", function (req, res) {
  const key = req.query.key;
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (key === null || key === undefined || key.length === 0) res.status(400);
  else {
    const value = req.body;
    let data = require("./data.json");
    data[key] = value;
    let fs = require("fs");
    fs.writeFile("data.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });
    res.status(200);
  }
  res.send();
});

http.listen(PORT, function () {
  let host = http.address().address;
  let port = http.address().port;

  console.log("listening at http://%s:%s", host, port);
});
