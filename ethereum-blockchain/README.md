# Voting Decentralized Application

> Built using Ethereum on local blockchain setup(Ganash)

#### Steps to run after changing a smart contract:

> Always keep notice that we cannot simply assign values to variable from smart contracts because of the asynchronous nature. So we have to use promises to do that.

1. We need to re-deploy our smart contract in the block chain so we have to migrate it with the command `truffle migrate --reset` This resets the smart contract on the blockchain.

1. We can check the deployed smart contract by running `truffle console`.

1. In the console we have to first create an __app__ variable with the running instance of the block chain. So for that run `Election.deployed().then(i => {app=i});`. 


### Testing app

To test the app run the command `truffle test`