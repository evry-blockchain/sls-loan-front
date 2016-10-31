import fs from 'fs';
import path from 'path';

var creds_name = process.env.MYCREDS || '/../mycreds.json';

var creds_file = path.join(__dirname, creds_name);

var config = JSON.parse(fs.readFileSync(creds_file, 'utf8'));

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
    // zip_url: 'https://gitlab.com/revichnr/SLS/repository/archive.zip?ref=master', //http/https of a link to download zip
    // unzip_dir: 'SLS-master-a2fbb6b24c41bbbc9c5d3c5e0fab62d0e26ea4e0',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
    // git_url: 'https://gitlab.com/revichnr/SLS/repository',             //git https URL. should point to the desired chaincode repo AND directory
    zip_url: 'https://github.com/evry-blockchain/loan-blockchain/archive/master.zip', //http/https of a link to download zip
    unzip_dir: 'loan-blockchain-master',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
    git_url: 'https://github.com/evry-blockchain/loan-blockchain',             //git https URL. should point to the desired chaincode repo AND directory

    deployed_name: "6a196e76cfa7f4bcd5c66c669ba3c253a7f16712eeb2ede5dc47e62094c54674394418845d378025d886ffef040d21d281b77568d347c3ad4592bd70216a5674"
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

config['ibm-blockchain-5-prod'][0].credentials.users.forEach(function (user) {
  options.network.users.push({
    "enrollId": user.enrollId,
    "enrollSecret": user.enrollSecret
  });
});

module.exports = options;
