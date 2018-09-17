const fs = require("fs");

const config = require("./config.js");

// creates a contact instance
const initContract = () => {
  let contractJSON = fs.readFileSync(
    "../ethereum-blockchain/build/contracts/Election.json",
    "utf8"
  );
  let contractAddress = "0x42366b2c11fb2e39582c21bf2b75e83be0b5d013";
  contractJSON = JSON.parse(contractJSON);
  const MyContract = config.web3.eth.contract(contractJSON.abi);
  return MyContract.at(contractAddress);
};

const getListOfCandidates = () => {
  let candidates = [];
  return new Promise((resolve, reject) => {
    resolve(bcInstance.candidates(1));
  }).then(c1 => {
    candidates.push(c1);
    return new Promise((resolve, reject) => {
      resolve(bcInstance.candidates(2));
    }).then(c2 => {
      candidates.push(c2);
      return candidates;
    });
  });
};

const vote = (candidateId, voterId, aadhar) => {
  return new Promise((resolve, reject) => {
    let i;
    try {
      i = bcInstance.vote(candidateId, aadhar, { from: voterId });
    } catch (error) {
      reject(error);
    }
    resolve(i);
  });
};

// config.web3.eth.getCoinbase((err, acc) => {
//   if (err == null) {
//     console.log(acc);
//   }
// });

module.exports = {
  initContract,
  getListOfCandidates,
  vote
};
