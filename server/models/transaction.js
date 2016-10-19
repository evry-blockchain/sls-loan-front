var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = Transaction => {

  Transaction.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Transaction.getList = (filter, cb) => {
      user.cc.query.getTransactionsList([], user.username, (err, data) => {
        cb(err, prepareListData(data, filter));
    });
  };

  Transaction.count = cb => {
      user.cc.query.getTransactionsQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  Transaction.add = (transaction, cb)=> {
      user.cc.invoke.addTransaction([
        transaction.fromAccountID,
        transaction.toAccountID,
        transaction.date,
        transaction.transactionType,
        transaction.transactionRelatedEntityID,
        transaction.amount
      ], user.username, (err, data) => {
        cb(err, data);
    });
  };

  Transaction.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'Transaction', root: true}
  });

  Transaction.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Transaction.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Transaction', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
