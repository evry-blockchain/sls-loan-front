import storage from './cc-user-storage';
import options from './cc-options';

import Ibc1 from './ibm-blockchain-local';
import winston from 'winston';

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'sls-loan-strongloop-connector.log'})
  ]
});
var ibc = new Ibc1(logger);

module.exports = function (context, cb) {
  let token = context.req.headers.access_token;
  let user = storage.get(token);

  if (!user) {
    //no user in storage, try to re-initialize from session
    user = context.req.session[token];
    if (user) {
      options.network.users.push({
        "enrollId": user.username,
        "enrollSecret": user.password
      });

      ibc.load(options, function (err, cc) {
        if (err) {
          console.log(err);
        } else {
          user.cc = cc;
          storage.store(token, user);
          cb(user);
        }
      });
    } else {
      cb(user);
    }
  } else {
    cb(user);
  }
};
