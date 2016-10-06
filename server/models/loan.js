import chaincode from '../connectors/chaincode';

module.exports = Loan => {
  Loan.getList = cb => {
    chaincode(cc => {
      cc.query.getLoansList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Loan.count = cb => {
    chaincode(cc => {
      cc.query.getLoansQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Loan.add = (loan, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoan([
        loan.ArrangerBank,
        loan.BorrowerID,
        loan.Amount,
        loan.InterestRate,
        loan.InterestTerm,
        loan.Fee,
        loan.AgreementDate,
        loan.NegotiationStatus
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  Loan.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'Loan', root: true}
  });

  Loan.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Loan.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Loan', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
