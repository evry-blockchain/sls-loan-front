import chaincode from '../connectors/chaincode';

module.exports = LoanRequest => {
  LoanRequest.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanRequestsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanRequest.count = cb => {
    chaincode(cc => {
      cc.query.getLoanRequestsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanRequest.add = (loanRequest, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanRequest([
        loanRequest.BorrowerID,
        loanRequest.ArrangerBankID,
        loanRequest.LoanSharesAmount,
        loanRequest.ProjectRevenue,
        loanRequest.ProjectName,
        loanRequest.ProjectInformation,
        loanRequest.Company,
        loanRequest.Website,
        loanRequest.ContactPersonName,
        loanRequest.ContactPersonSurname,
        loanRequest.RequestDate,
        loanRequest.Status
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  LoanRequest.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanRequest', root: true}
  });

  LoanRequest.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanRequest.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'LoanRequest',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

};
