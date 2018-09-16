var config = require("./config.js");
const fs = require("fs");
// config.web3.eth.

let web3Provider = null;
// let contracts = {};
let account = "0x0";
let myContInstance;

// creates a contact instance
const initContract = () => {
  let contractJSON = fs.readFileSync(
    "../ethereum-blockchain/build/contracts/Election.json",
    "utf8"
  );
  contractJSON = JSON.parse(contractJSON);
  const MyContract = config.web3.eth.contract(contractJSON.abi);
  myContInstance = MyContract.at("0xcd21f84d876c1cc09c3630c76dffd2f31731fe7f");
  console.log(myContInstance.candidates(1)[2].toNumber());
};

const init = function() {
  return initWeb3();
};

const render = () => {
  var electionInstance;
  var loader = $("#loader");
  var content = $("#content");

  loader.show();
  content.hide();

  // Load account data
  web3.eth.getCoinbase((err, account) => {
    if (err === null) {
      account = account;
      $("#accountAddress").html("Your Account: " + account);
    }
  });

  // Load contract data
  contracts.Election.deployed()
    .then(instance => {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    })
    .then(candidatesCount => {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(candidate => {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate =
            "<tr><th>" +
            id +
            "</th><td>" +
            name +
            "</td><td>" +
            voteCount +
            "</td></tr>";
          candidatesResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    })
    .catch(error => {
      console.warn(error);
    });
};

// config.web3.eth.getCoinbase((err, acc) => {
//   if (err == null) {
//     console.log(acc);
//   }
// });

initContract();