const Election = artifacts.require("./Election.sol");

contract("Election", accounts => {
  let electionInstance;
  
  it("initializes with two candidates", () =>
    Election.deployed()
      .then(instance => instance.candidatesCount())
      .then(count => assert.equal(count, 2)));

  it("initializes the candidates with correct values", () => {
    Election.deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.candidates(0);
      })
      .then(candidate => {
        assert.equal(candidate[0], 1, "contains the correct id");
        assert.equal(candidate[1], "Candidate 1", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct vote count");
        return electionInstance.candidates(1);
      })
      .then(candidate => {
        assert.equal(candidate[0], 2, "contains the correct id");
        assert.equal(candidate[1], "Candidate 2", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct vote count");
      });
  });
});
