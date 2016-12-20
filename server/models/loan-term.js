var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanTerm => {

  LoanTerm.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanTerm.getList = (filter, cb) => {
    user.cc.query.getLoanTermList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanTerm.count = cb => {
    user.cc.query.getLoanTermQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanTerm.add = (loanTerm, cb) => {
    if (loanTerm.loanTermID) {
      user.cc.invoke.updateLoanTerm([
        loanTerm.loanTermID,
        loanTerm.loanRequestID,
        loanTerm.paragraphNumber,
        loanTerm.loanTermText,
        loanTerm.loanTermStatus
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanTerm([
        loanTerm.loanRequestID,
        loanTerm.paragraphNumber,
        loanTerm.loanTermText,
        loanTerm.loanTermStatus
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanTerm.update = (loanTerm, cb) => {
    user.cc.invoke.updateLoanTerm([
      loanTerm.loanTermID,
      loanTerm.loanRequestID,
      loanTerm.paragraphNumber,
      loanTerm.loanTermText,
      loanTerm.loanTermStatus
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanTerm.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanTerm', root: true}
  });

  LoanTerm.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanTerm.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanTerm', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
  LoanTerm.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: {arg: 'data', type: 'LoanTerm', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
