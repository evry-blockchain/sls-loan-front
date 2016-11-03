var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';
import prepareSingleData from '../utils/prepare-single-data';

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

  LoanNegotiation.getList = (filter, cb) => {
    user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanNegotiation.count = cb => {
    user.cc.query.getLoanNegotiationsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanNegotiation.add = (loanNegotiation, cb)=> {
    if(loanNegotiation.loanNegotiationID) {
      user.cc.invoke.updateLoanNegotiation([
        loanNegotiation.loanNegotiationID,
        loanNegotiation.loanInvitationID,
        loanNegotiation.participantBankID,
        loanNegotiation.amount,
        loanNegotiation.negotiationStatus,
        loanNegotiation.participantBankComment,
        loanNegotiation.date
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanNegotiation([
        loanNegotiation.loanInvitationID,
        loanNegotiation.participantBankID,
        loanNegotiation.amount,
        loanNegotiation.negotiationStatus,
        loanNegotiation.participantBankComment,
        loanNegotiation.date
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanNegotiation.update = (loanNegotiation, cb)=> {
    console.log(loanNegotiation);
    user.cc.invoke.updateLoanNegotiation([
      loanNegotiation.loanNegotiationID,
      loanNegotiation.loanInvitationID,
      loanNegotiation.participantBankID,
      loanNegotiation.amount,
      loanNegotiation.negotiationStatus,
      loanNegotiation.participantBankComment,
      loanNegotiation.date
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanNegotiation.get = (id, cb) => {
    user.cc.query.getLoanNegotiationByKey([id], user.username, (err, data) => {
      cb(err, prepareSingleData(data));
    }, ['bankid']);
  };

  LoanNegotiation.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
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

  LoanNegotiation.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: {
      arg: 'data',
      type: 'LoanNegotiation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

  LoanNegotiation.remoteMethod('get', {
    http: {
      path: '/:id',
      verb: 'get'
    },
    accepts: {arg: 'id', type: 'string', required: true},
    returns: {type: 'LoanNegotiation', root: true}
  });
};
