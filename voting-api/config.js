const web3 = require("web3");
const web3_provider = "http://localhost:7545";
const _web3 = new web3();
_web3.setProvider(new web3.providers.HttpProvider(web3_provider));
exports.web3 = _web3;

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
} else if (env === "test") {
  process.env.PORT = 3000;
} else if (env === "production") {
  process.env.MONGODB_URI =
  "mongodb://thakursaurabh1998:helloworld123@ds131531.mlab.com:31531/todoapp";
}