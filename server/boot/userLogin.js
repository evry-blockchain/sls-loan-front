import Ibc1 from 'ibm-blockchain-js';
import winston from 'winston';

import storage from '../utils/cc-user-storage';
import options from '../utils/cc-options';

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'sls-loan-strongloop-connector.log'})
  ]
});

var ibc = new Ibc1(logger);             //you can pass a logger such as winston here - optional

module.exports = function (app) {
  var AccessToken = app.models.AccessToken;

  app.post('/api/login', function (req, res) {
    //parse user credentials from request body
    let userCredentials = {
      "username": req.body.username,
      "password": req.body.password
    };

    options.network.users.push({
      "enrollId": userCredentials.username,
      "enrollSecret": userCredentials.password
    });

    ibc.load(options, function (err, cc) {
      if (err) {
        res.status(401).json({"error": err});
      } else {
        ibc.register(0, userCredentials.username, userCredentials.password, 3, () => {
          AccessToken.createAccessTokenId(function (err, token) {
            if (!err) {
              userCredentials.cc = cc;
              req.session[token] = userCredentials;
              storage.store(token, userCredentials);
              res.json({
                token: token,
                ttl: 86400
              });
            } else {
              console.log(err);
            }
          });
        });
      }
    });
  });
};
