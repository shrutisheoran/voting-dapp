const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// const request = require("request");
const multer = require("multer");
const request = require("request-promise");
const formidable = require("formidable");

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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

function base64_encode(file) {
  let bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString("base64");
}

app.post("/enroll", async function(req, resp) {
  const form = new formidable.IncomingForm();
  let aadhar;
  let name;
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    aadhar = fields.aadhar;
    name = fields.name;
  });

  form.on("fileBegin", function(name, file) {
    console.log("uploading");
    file.path = __dirname + "/uploads/hero.jpg";
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });

  form.on("end", async function(err, fields, files) {
    console.log(aadhar);
    let headers = {
      "Content-Type": "application/json",
      app_id: "e7d3bd5d",
      app_key: "3fab1a41d71ebcf49b143b0b18e50b98"
    };
    let image = base64_encode(`./uploads/hero.jpg`);
    let enrollBody = {
      image: image,
      subject_id: aadhar,
      gallery_name: "Voting2"
    };

    const response = await request({
      url: "https://api.kairos.com/enroll",
      method: "POST",
      body: JSON.stringify(enrollBody),
      headers: headers
    });
    const voterId = "0x047CF52123f597E78311A790d2a71E5fA260Fbb8";
    const qrcode = `https://api.qrserver.com/v1/create-qr-code/?data={"name":"${name}", "aadhar":${aadhar}, "voterId":"${voterId}"}`;
    console.log(response);
    resp.send({...JSON.parse(response), qrcode });
  });
});

app.post("/verify", async function(req, resp) {
  const form = new formidable.IncomingForm();
  let aadhar;
  let name;
  form.parse(req, (err, fields, files) => {
    console.log("F"+JSON.stringify(fields, null, 4));
    aadhar = fields.aadhar;
    name = fields.name;
  });

  form.on("fileBegin", function(name, file) {
    console.log("uploading");
    file.path = __dirname + "/uploads/hero.jpg";
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });

  form.on("end", async function(err, fields, files) {
    console.log(aadhar);
    let headers = {
      "Content-Type": "application/json",
      app_id: "e7d3bd5d",
      app_key: "3fab1a41d71ebcf49b143b0b18e50b98"
    };
    let image = base64_encode(`./uploads/hero.jpg`);
    let enrollBody = {
      image: image,
      subject_id: aadhar,
      gallery_name: "Voting2"
    };

    const response = await request({
      url: "https://api.kairos.com/verify",
      method: "POST",
      body: JSON.stringify(enrollBody),
      headers: headers
    });
    console.log(response);
    resp.json(JSON.parse(response));
  });
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
