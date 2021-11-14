const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//databse connection setup
//table columns - id, long_url, url_code
const dbconn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Welcome123@",
  database: "urlshortener",
});

dbconn.connect(function (error) {
  if (error) console.log("Database connection failed");
});

//API call to genertae short url
app.post("/api/generate-short-url", function (req, res) {

  //generate randow keycodes for url shortening
  let shortCode = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]/gi, "")
    .substr(2, 7);
  let sql = `INSERT INTO urls(long_url, url_code) VALUES('${req.body.longUrl}','${shortCode}')`;
  dbconn.query(sql, function (error, result) {
    if (error) {
      res.status(500).json({
        message: "Error occured!!",
      });
    } else {
      res.status(200).json({
        status: "OK",
        message: "Instered successfully!!",
        shortUrl: shortCode,
      });
    }
  });
});

//API call to get al shortened URL saved in database
app.get("/api/short-urls", function (req, res) {
  let sql = `SELECT * FROM urls`;
  dbconn.query(sql, function (error, result) {
    if (error) {
      res.status(500).json({
        message: "Error occured!!",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

//API call to open individual shortened url
app.get("/:urlCode", function (req, res) {
  let urlCode = req.params.urlCode;
  let sql = `SELECT * FROM urls WHERE url_code = '${urlCode}' LIMIT 1`;
  dbconn.query(sql, function (error, result) {
    if (error) {
      res.status(500).json({
        message: "Error occured!!",
      });
    } else {
      res.redirect(result[0].long_url);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`running... on port ${PORT}`));
