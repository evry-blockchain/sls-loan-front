import chaincode from '../connectors/chaincode';

module.exports = LoanInvitation => {
  LoanInvitation.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanInvitationsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanInvitation.count = cb => {
    chaincode(cc => {
      cc.query.getLoanInvitationsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanInvitation.add = (loanInvitation, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanInvitation([
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

  LoanInvitation.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanInvitation', root: true}
  });

  LoanInvitation.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanInvitation.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'LoanInvitation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

};
