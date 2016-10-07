import chaincode from '../connectors/chaincode';

module.exports = Account => {
  Account.getList = cb => {
    chaincode(cc => {
      cc.query.getAccountsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Account.count = cb => {
    chaincode(cc => {
      cc.query.getAccountsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Account.add = (account, cb)=> {
    chaincode(cc => {
      cc.invoke.addAccount([account.ParticipantID, account.Amount], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  Account.update = (account, cb)=> {
    chaincode(cc => {
      cc.invoke.updateAccountAmount([account.AccountID, account.Amount], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
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
