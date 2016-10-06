import chaincode from '../connectors/chaincode';

module.exports = LoanReturn => {
  LoanReturn.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanReturnsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanReturn.count = cb => {
    chaincode(cc => {
      cc.query.getLoanReturnsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanReturn.add = (loanReturn, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanReturn([
        loanReturn.LoanID,
        loanReturn.Amount,
        loanReturn.ReturnDate,
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  LoanReturn.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanReturn', root: true}
  });

  LoanReturn.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanReturn.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanReturn', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
