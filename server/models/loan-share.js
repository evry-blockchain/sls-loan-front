import chaincode from '../connectors/chaincode';

module.exports = LoanShare => {
  LoanShare.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanSharesList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanShare.count = cb => {
    chaincode(cc => {
      cc.query.getLoanSharesQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanShare.add = (loanShare, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanShare([
        loanShare.LoanShareId,
        loanShare.LoanId,
        loanShare.ParticipantBankId,
        loanShare.Amount,
        loanShare.NegotiationStatus
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  LoanShare.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanShare', root: true}
  });

  LoanShare.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanShare.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanShare', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
