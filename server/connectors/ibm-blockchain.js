var Connector = require('loopback-connector').Connector;
var g = require('strong-globalize')();

var Ibc1 = require('ibm-blockchain-js');
var winston = require('winston');
var fs = require('fs');
var deepExtend = require("deep-extend");
var util = require('util');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'sls-loan-strongloop-connector.log'})
  ]
});
var ibc = new Ibc1(logger);             //you can pass a logger such as winston here - optional
var chaincode = {};

var config = JSON.parse(fs.readFileSync(__dirname + '/../mycreds.json', 'utf8'));

var functionsMap = {

};

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

/**
 * The constructor for IbmBlockchain connector
 * @param {Object} settings The settings object
 * @param {DataSource} dataSource The data source instance
 * @constructor
 */
function IbmBlockchain(settings, dataSource) {
  Connector.call(this, 'IbmBlockchain', settings);

  this.debug = settings.debug || debug.enabled;

  if (this.debug) {
    debug('Settings: %j', settings);
  }

  this.dataSource = dataSource;
}

util.inherits(IbmBlockchain, Connector);

IbmBlockchain.prototype.connect = function (callback) {
  var self = this;
  if (self.cc) {
    process.nextTick(function () {
      callback && callback(null, self.cc);
    });
  } else if (self.dataSource.connecting) {
    self.dataSource.once('connected', function () {
      process.nextTick(function () {
        callback && callback(null, self.cc);
      });
    });
  } else {
    ibc.load(options, function (err, cc) {
      if (!err) {
        if (self.debug) {
          debug('Blockchain connection is established!'); //TODO: add established peer address
        }
        self.cc = cc;
      } else {
        if (self.debug || !callback) {
          g.error('Blockchain connection failed', err); //TODO: add established peer address
        }
      }
      callback && callback(err, cc);
    });
  }
};

IbmBlockchain.prototype.create = function () {

}
IbmBlockchain.prototype.updateOrCreate = function () {

}
IbmBlockchain.prototype.replaceOrCreate = function () {

}
IbmBlockchain.prototype.findOrCreate = function () {

}
IbmBlockchain.prototype.buildNearFilter = function () {

}
IbmBlockchain.prototype.all = function () {

}
IbmBlockchain.prototype.destroyAll = function () {

}
IbmBlockchain.prototype.count = function (model, where, options, callback) {
  var self = this;
  if (self.debug) {
    debug('count', model, where);
  }
  // where = self.buildWhere(model, where);
  this.execute(model, 'count', where, function(err, count) {
    if (self.debug) {
      debug('count.callback', model, err, count);
    }
    callback && callback(err, count);
  });
}
IbmBlockchain.prototype.save = function () {

}
IbmBlockchain.prototype.update = function () {

}
IbmBlockchain.prototype.destroy = function () {

}
IbmBlockchain.prototype.replaceById = function () {

};
IbmBlockchain.prototype.updateAttributes = function () {

};

IbmBlockchain.prototype.execute = function(model, command) {

};

/**
 * Initialize the MongoDB connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {
  if (!Ibc1) {
    return;
  }

  var s = dataSource.settings;

  s.safe = (s.safe !== false);
  s.w = s.w || 1;
  s.url = s.url || generateMongoDBURL(s);
  dataSource.connector = new IbmBlockchain(s, dataSource);

  if (callback) {
    if (s.lazyConnect) {
      process.nextTick(function () {
        callback();
      });
    } else {
      dataSource.connector.connect(callback);
    }
  }
};
