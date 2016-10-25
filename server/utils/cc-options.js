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

    deployed_name: "878c272b3b7558c12b03ca39569f2487139d071286ca563b055453a3406274b5b068d6275694fabe749ae30fffb6d12ad69c0f65144f1c8236123f12bae64e2a"
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
