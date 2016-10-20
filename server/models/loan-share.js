var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanShare => {

  LoanShare.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanShare.getList = (filter, cb) => {
      user.cc.query.getLoanSharesList([], user.username, (err, data) => {
        cb(err, prepareListData(data, filter));
      });
  };

  LoanShare.count = cb => {
      user.cc.query.getLoanSharesQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  LoanShare.add = (loanShare, cb)=> {
      user.cc.invoke.addLoanShare([
        loanShare.loanShareId,
        loanShare.loanId,
        loanShare.participantBankId,
        loanShare.amount,
        loanShare.negotiationStatus
      ], user.username, (err, data) => {
        cb(err, data);
      });
  };

  LoanShare.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
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
