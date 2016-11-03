var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';
import prepareSingleData from '../utils/prepare-single-data';

module.exports = LoanInvitation => {
  LoanInvitation.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanInvitation.getList = (filter, cb) => {
    user.cc.query.getLoanInvitationsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanInvitation.count = cb => {
    user.cc.query.getLoanInvitationsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanInvitation.add = (loanInvitation, cb)=> {
    if (loanInvitation.loanInvitationID) {
      user.cc.invoke.updateLoanInvitation([
        loanInvitation.loanInvitationID,
        loanInvitation.arrangerBankID,
        loanInvitation.borrowerID,
        loanInvitation.loanRequestID,
        loanInvitation.loanTerm,
        loanInvitation.amount,
        loanInvitation.interestRate,
        loanInvitation.info,
        loanInvitation.status,
        loanInvitation.assets,
        loanInvitation.convenants
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {

      user.cc.invoke.addLoanInvitation([
        loanInvitation.arrangerBankID,
        loanInvitation.borrowerID,
        loanInvitation.loanRequestID,
        loanInvitation.loanTerm,
        loanInvitation.amount,
        loanInvitation.interestRate,
        loanInvitation.info,
        loanInvitation.status,
        loanInvitation.assets,
        loanInvitation.convenants
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };
  LoanInvitation.update = (loanInvitation, cb)=> {
    user.cc.invoke.updateLoanInvitation([
      loanInvitation.loanInvitationID,
      loanInvitation.arrangerBankID,
      loanInvitation.borrowerID,
      loanInvitation.loanRequestID,
      loanInvitation.loanTerm,
      loanInvitation.amount,
      loanInvitation.interestRate,
      loanInvitation.info,
      loanInvitation.status,
      loanInvitation.assets,
      loanInvitation.convenants
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);

  };

  LoanInvitation.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanInvitation', root: true}
  });

  LoanInvitation.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanInvitation.get = (id, cb) => {
    user.cc.query.getLoanInvitationByKey([id], user.username, (err, data) => {
      cb(err, prepareSingleData(data));
    }, ['bankid']);
  };

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

  LoanInvitation.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: {
      arg: 'data',
      type: 'LoanInvitation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

  LoanInvitation.remoteMethod('get', {
    http: {
      path: '/:id',
      verb: 'get'
    },
    accepts: {arg: 'id', type: 'string', required: true},
    returns: {type: 'LoanInvitation', root: true}
  });
};
