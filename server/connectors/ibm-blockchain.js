var Ibc1 = require('ibm-blockchain-js');
var winston = require('winston');
var fs = require('fs');
var deepExtend = require("deep-extend");


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'sls-loan-strongloop-connector.log' })
    ]
});
var ibc = new Ibc1(logger);             //you can pass a logger such as winston here - optional
var chaincode = {};

var config = JSON.parse(fs.readFileSync(__dirname+'/../mycreds.json', 'utf8'));

if(process.env.VCAP_SERVICES) {
    deepExtend(config, JSON.parse(process.env.VCAP_SERVICES));
}


// // ==================================
// // configure ibc-js sdk
// // ==================================
var options =   {
    network:{
        peers:   [],
        users:  [],
        options: {                          //this is optional
            quiet: true,
            timeout: 60000
        }
    },
    chaincode: {
        zip_url: 'https://github.com/evry-blockchain/loan-blockchain/archive/master.zip', //http/https of a link to download zip
        unzip_dir: 'loan-blockchain-master',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
        git_url: 'https://github.com/evry-blockchain/loan-blockchain',             //git https URL. should point to the desired chaincode repo AND directory

        deployed_name: "9c48ad77840a3872a068e40085f4fa072fff2e2f942958045a5882f41826a0d754dd787466d9a3494a2fab167f6b81a67a01aa22930e5435e2bfeb56e8eb19a5"
    }
};


config['ibm-blockchain-5-prod'][0].credentials.peers.forEach(function(peer) {
    options.network.peers.push({
        "api_host": peer.api_host,
        "api_port_tls": peer.api_port_tls,
        "api_port": peer.api_port,
        "id": peer.id
    });
});

config['ibm-blockchain-5-prod'][0].credentials.users.forEach(function(user) {
    options.network.users.push({
        "enrollId": user.enrollId,
        "enrollSecret": user.enrollSecret
    });
});

// Step 2 ==================================
ibc.load(options, cb_ready);

function cb_ready(err, cc){                             //response has chaincode functions
    console.log(cc.query.getLoanRequestsList());
    // console.log(chaincode);
}
