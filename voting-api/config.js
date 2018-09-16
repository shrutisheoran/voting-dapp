const web3 = require("web3");
const web3_provider = "http://localhost:7545";
const _web3 = new web3();
_web3.setProvider(new web3.providers.HttpProvider(web3_provider));
exports.web3 = _web3;
exports.me = {
    addr: "0x1bAE32ba36413B1789e41C85c40Ae1b3FB71fBc9",
    pkey: "475bdc304f4f2ef669fa800892720d491a70eb01d8bf3f5955f4423b8ac7497a"
};
