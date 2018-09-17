const express = require("express");
const bodyParser = require("body-parser");

const bc = require("./blockchain_handler");

bcInstance = bc.initContract();
// console.log(bcInstance.candidates(1)[2].toNumber());

let app = express();

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
  // bcInstance.vote(candidateId, { from: voterId })
  bc.vote(candidateId, voterId, aadhar)
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(err => {
      res.status(500).send({ error: err + "" });
    });
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
