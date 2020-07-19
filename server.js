require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "us2",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/collabeat");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/music", (req, res) => {
  pusher.trigger("makeMusic", "pickNotes", req.body);
  res.json(req.body);
  console.log("pusher worked");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
