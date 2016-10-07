import chaincode from '../connectors/chaincode';

module.exports = LoanSale => {
  LoanSale.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanSalesList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanSale.count = cb => {
    chaincode(cc => {
      cc.query.getLoanSalesQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanSale.add = (loanSale, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanSale([
        loanSale.FromLoanSaleID,
        loanSale.ToParticipantID,
        loanSale.AmountSold
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  LoanSale.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanSale', root: true}
  });

  LoanSale.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanSale.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanSale', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

};
