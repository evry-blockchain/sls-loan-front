var user;
import beforeRemote from '../utils/cc-before-remote-init';

module.exports = Account => {

  Account.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Account.getList = cb => {
    user.cc.query.getAccountsList([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });

  };

  Account.count = cb => {
    user.cc.query.getAccountsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  Account.add = (account, cb)=> {
    user.cc.invoke.addAccount([account.ParticipantID, account.Amount], user.username, (err, data) => {
      cb(err, data);
    });
  };

  Account.update = (account, cb)=> {
    user.cc.invoke.updateAccountAmount([account.AccountID, account.Amount], user.username, (err, data) => {
      cb(err, data);
    });
  };

  Account.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'Account', root: true}
  });

  Account.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Account.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'object',
      http: {source: 'body'},
      default: `{
        "ParticipantID": "",
        "Amount": ""
      }`
    },
    returns: {type: 'object', root: true}
  });

  Account.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: {
      arg: 'data',
      type: 'Account',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

};
