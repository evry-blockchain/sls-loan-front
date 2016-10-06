var Ibc1 = require('ibm-blockchain-js');
var winston = require('winston');
var fs = require('fs');
var deepExtend = require("deep-extend");
var util = require('util');
var callback;

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'sls-loan-strongloop-connector.log'})
  ]
});
var ibc = new Ibc1(logger);             //you can pass a logger such as winston here - optional
// ibc.clear();
var chaincode;

var config = JSON.parse(fs.readFileSync(__dirname + '/../mycreds.json', 'utf8'));

if (process.env.VCAP_SERVICES) {
  deepExtend(config, JSON.parse(process.env.VCAP_SERVICES));
}

// console.dir(config['ibm-blockchain-5-prod'][0]['peers']);

// // ==================================
// // configure ibc-js sdk
// // ==================================
var options = {
  network: {
    peers: [],
    users: [],
    options: {                          //this is optional
      quiet: true,
      timeout: 60000
    }
  },
  chaincode: {
    zip_url: 'https://github.com/evry-blockchain/loan-blockchain/archive/master.zip', //http/https of a link to download zip
    unzip_dir: 'loan-blockchain-master',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
    git_url: 'https://github.com/evry-blockchain/loan-blockchain',             //git https URL. should point to the desired chaincode repo AND directory

    deployed_name: "84603c129f96dd2b21bb56d928d39c90e51c85443f1972e8cd8a39ab6a42c8b065ca5571eefeb43eeb8e64559862c8aa2987adb8c04e84fc08ec003816e3efd3"
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

ibc.load(options, function (err, cc) {
  if (err) {
    console.log(err);
  } else {
    chaincode = cc;
    if( typeof callback == 'function' ) {
      callback(chaincode, ibc);
    }
  }
});

module.exports = function(cb) {
  if(typeof chaincode != 'undefined') {
    cb(chaincode, ibc);
  } else {
    callback = cb;
  }
};
