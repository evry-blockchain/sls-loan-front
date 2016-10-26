var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

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

  Account.getList = (filter, cb) => {
    user.cc.query.getAccountsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);

  };

  Account.count = cb => {
    user.cc.query.getAccountsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  Account.add = (account, cb)=> {
    user.cc.invoke.addAccount([account.participantID, account.amount], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  Account.update = (account, cb)=> {
    user.cc.invoke.updateAccountAmount([account.accountID, account.amount], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  Account.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
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
