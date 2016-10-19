var fs = require('fs');
var deepExtend = require("deep-extend");
var util = require('util');

var config = JSON.parse(fs.readFileSync(__dirname + '/../mycreds.json', 'utf8'));

if (process.env.VCAP_SERVICES) {
  deepExtend(config, JSON.parse(process.env.VCAP_SERVICES));
}

// // ==================================
// // configure ibc-js sdk
// // ==================================
var options = {
  network: {
    peers: [],
    users: [],
    options: {                          //this is optional
      quiet: true,
      timeout: 60000,
      tls: false
    }
  },
  chaincode: {
    zip_url: 'https://github.com/evry-blockchain/loan-blockchain/archive/master.zip', //http/https of a link to download zip
    unzip_dir: 'loan-blockchain-master',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
    git_url: 'https://github.com/evry-blockchain/loan-blockchain',             //git https URL. should point to the desired chaincode repo AND directory

    deployed_name: "893e9f2e14c4bd6fb090f909280183927a10fdcd8cc9ca0722c2510bbd475eb1918d3957272035482abefd86641158edfa9418271e9a866d165fab2f169f56a1"
  }
};

config['ibm-blockchain-5-prod'][0].credentials.peers.forEach(function (peer) {
  options.network.peers.push({
    "api_host": peer.api_host,
    "api_port_tls": peer.api_port_tls,
    "api_port": peer.api_port,
    "id": peer.id
  });
});

module.exports = options;
