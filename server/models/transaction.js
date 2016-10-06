import chaincode from '../connectors/chaincode';

module.exports = Transaction => {
  Transaction.getList = cb => {
    chaincode(cc => {
      cc.query.getTransactionsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Transaction.count = cb => {
    chaincode(cc => {
      cc.query.getTransactionsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Transaction.add = (transaction, cb)=> {
    chaincode(cc => {
      cc.invoke.addTransaction([
        transaction.FromAccountID,
        transaction.ToAccountID,
        transaction.Date,
        transaction.TransactionType,
        transaction.TransactionRelatedEntityID,
        transaction.Amount
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
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
