var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanNegotiation => {
  LoanNegotiation.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanNegotiation.getList = cb => {
    user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
      cb(err, prepareListData(data));
    });
  };

  LoanNegotiation.count = cb => {
    user.cc.query.getLoanNegotiationsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  LoanNegotiation.add = (loanNegotiation, cb)=> {
    user.cc.invoke.addLoanNegotiation([
      loanNegotiation.loanInvitationID,
      loanNegotiation.participantBankID,
      loanNegotiation.amount,
      loanNegotiation.negotiationStatus,
      loanNegotiation.participantBankComment
    ], user.username, (err, data) => {
      cb(err, data);
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
