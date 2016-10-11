var user;
import beforeRemote from '../utils/cc-before-remote-init';

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

  Transaction.getList = cb => {
      user.cc.query.getTransactionsList([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  Transaction.count = cb => {
      user.cc.query.getTransactionsQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  Transaction.add = (transaction, cb)=> {
      user.cc.invoke.addTransaction([
        transaction.FromAccountID,
        transaction.ToAccountID,
        transaction.Date,
        transaction.TransactionType,
        transaction.TransactionRelatedEntityID,
        transaction.Amount
      ], user.username, (err, data) => {
        cb(err, data);
    });
  };

  Transaction.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
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
