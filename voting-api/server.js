const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const request = require("request");

const bc = require("./blockchain_handler");

bcInstance = bc.initContract();
// console.log(bcInstance.candidates(1)[2].toNumber());

let app = express();

const headers = {
  Accept: "application/json"
};

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

// CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/candidates", (req, res) => {
  bc.getListOfCandidates().then(candidates => res.status(200).send(candidates));
});

app.post("/vote", (req, res) => {
  const { voterId, candidateId, aadhar } = req.body;
  bc.vote(candidateId, voterId, aadhar)
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(err => {
      res.status(500).send({ error: err + "" });
    });
});

app.get("/qrdata", (req, res) => {
  // let imgfile = fs.readFileSync("./qrst.png");

  var formData = {
    file: fs.createReadStream(__dirname + "/qrst.png")
  };

  request.post(
    { url: "https://api.qrserver.com/v1/read-qr-code/", formData: formData },
    (err, httpResponse, body) => {
      if (err) {
        res.status(500).send({ err });
      }
      let parsedBody = JSON.parse(body);
      res.status(200).send(JSON.parse(parsedBody[0].symbol[0].data));
    }
  );
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
