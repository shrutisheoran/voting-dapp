// solium-disable linebreak-style
pragma solidity ^0.4.24;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Map of candidates
    mapping(uint => Candidate) public candidates;
    // map of voters who have voted
    mapping(address => bool) public voters;
    // storing count of candidates
    uint public candidatesCount;

    event votedEvent(
        uint indexed _candidateId
    );

    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender], "Already Voted");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid Candidate");
    
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        votedEvent(_candidateId);
    }
}