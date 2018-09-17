const Election = artifacts.require("./Election.sol");

contract("Election", accounts => {
  let electionInstance;
  let candidateId;

  it("initializes with two candidates", () =>
    Election.deployed()
      .then(instance => instance.candidatesCount())
      .then(count => assert.equal(count, 2)));

  it("initializes the candidates with correct values", () =>
    Election.deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(candidate => {
        // console.log(candidate[0].toNumber());
        assert.equal(candidate[0], 1, "contains the correct id");
        assert.equal(candidate[1], "Candidate 1", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct vote count");
        return electionInstance.candidates(2);
      })
      .then(candidate => {
        assert.equal(candidate[0], 2, "contains the correct id");
        assert.equal(candidate[1], "Candidate 2", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct vote count");
      }));

  it("allows a voter to cast a vote", () =>
    Election.deployed()
      .then(instance => {
        candidateId = 1;
        aadhar = 123456789012;
        name = "Saurabh Thakur";
        electionInstance = instance;
        return electionInstance.vote(candidateId, aadhar, {
          from: accounts[0]
        });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        assert.equal(
          receipt.logs[0].event,
          "votedEvent",
          "the event type is correct"
        );
        assert.equal(
          receipt.logs[0].args._candidateId.toNumber(),
          candidateId,
          "the candidate id is correct"
        );
        return electionInstance.voters(aadhar);
      })
      .then(voted => {
        assert(voted[0], "the voter was marked as voted");
        return electionInstance.candidates(candidateId);
      })
      .then(candidate => {
        const voteCount = candidate[2];
        assert.equal(voteCount, 1, "increments the candidate's vote count");
      }));

  it("throws an exception for invalid candidates", () =>
    Election.deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.vote(99, aadhar, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        return electionInstance.candidates(1);
      })
      .then(candidate => {
        const voteCount = candidate[2];
        assert.equal(voteCount, 1, "Candidate 1 did not recieved any vote");
        return electionInstance.candidates(2);
      })
      .then(candidate => {
        const voteCount = candidate[2];
        assert.equal(voteCount, 0, "Candidate 2 did not recieved any vote");
      }));

  it("throws an exception for double voting", () =>
    Election.deployed()
      .then(instance => {
        electionInstance = instance;
        candidateId = 2;
        electionInstance.vote(candidateId, aadhar + 1, { from: accounts[2] });
        return electionInstance.candidates(candidateId);
      })
      .then(candidate => {
        const voteCount = candidate[2];
        console.log(voteCount.toNumber());
        assert.equal(voteCount, 1, "accepts first vote");
        return electionInstance.vote(candidateId, aadhar, {
          from: accounts[1]
        });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        return electionInstance.candidates(1);
      })
      .then(candidate1 => {
        const voteCount = candidate1[2];
        assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
        return electionInstance.candidates(2);
      })
      .then(candidate2 => {
        const voteCount = candidate2[2];
        assert.equal(voteCount, 1, "candidate 2 did not recieve any votes");
      }));
});
