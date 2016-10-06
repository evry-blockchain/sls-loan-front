import chaincode from '../connectors/chaincode';

module.exports = LoanNegotiation => {
  LoanNegotiation.getList = cb => {
    chaincode(cc => {
      cc.query.getLoanNegotiationsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanNegotiation.count = cb => {
    chaincode(cc => {
      cc.query.getLoanNegotiationsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  LoanNegotiation.add = (loanNegotiation, cb)=> {
    chaincode(cc => {
      cc.invoke.addLoanNegotiation([
        loanNegotiation.LoanInvitationID,
        loanNegotiation.ParticipantBankID,
        loanNegotiation.Amount,
        loanNegotiation.NegotiationStatus,
        loanNegotiation.ParticipantBankComment
      ], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  LoanNegotiation.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanNegotiation', root: true}
  });

  LoanNegotiation.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanNegotiation.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'LoanNegotiation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });
};
