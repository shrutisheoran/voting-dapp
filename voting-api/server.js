const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const request = require("request");
const multer = require("multer");

const bc = require("./blockchain_handler");

bcInstance = bc.initContract();
// console.log(bcInstance.candidates(1)[2].toNumber());

let app = express();

const upload = multer({
  dest: "/uploads/"
  // limits: { fileSize: 1000000, files: 1 }
});

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/candidates", (req, res) => {
  new Promise((resolve, reject) => {
    const candidates = bc.getListOfCandidates();
    if (candidates) {
      resolve(candidates);
    }
  }).then(data => {
    data.forEach(i => {
      i.shift();
      i[1] = parseInt(i[1]);
    });
    res.status(200).send(data);
  });
});

app.get("/votecount", (req, res) => {
  new Promise((resolve, reject) => {
    const candidates = bc.getListOfCandidates();
    if (candidates) {
      resolve(candidates);
    }
  }).then(data => {
    data.forEach(i => {
      i[0] = parseInt(i[0]);
      i[2] = parseInt(i[2]);
    });
    res.status(200).send(data);
  });
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

app.post("/qrdata", upload.single("file"), (req, res) => {
  const ext = req.file.mimetype.slice(req.file.mimetype.indexOf("/") + 1);

  var file = __dirname + "\\uploads\\" + "test" + "." + ext;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
    } else {
      const formData = {
        file: fs.createReadStream(file)
      };

      request.post(
        { url: "https://api.qrserver.com/v1/read-qr-code/", formData },
        (err, httpResponse, body) => {
          if (err) {
            res.status(500).send({ err });
          }
          const parsedBody = JSON.parse(body);
          if (parsedBody[0].symbol[0].error == null)
            res.status(200).send(JSON.parse(parsedBody[0].symbol[0].data));
          else res.status(400).send({ error: "Cannot parse qr code." });
        }
      );
    }
  });
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
