import fs from 'fs';
import path from 'path';
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mycreds.json'), 'utf8'));

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

    deployed_name: "6081c3b8b532804d0f0761ad586934e60721034373f5378ee52bc65bbc12ef94599c91fcda6b711533484ebca099380cdc79f29bc0461181763b48023c992283"
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
