var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanTermComment => {

  LoanTermComment.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanTermComment.getList = (filter, cb) => {
    user.cc.query.getLoanTermCommentsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanTermComment.count = cb => {
    user.cc.query.getLoanTermCommentsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanTermComment.add = (loanTermComment, cb) => {
    if (loanTermComment.loanTermCommentID) {
      user.cc.invoke.updateLoanTermComment([
        loanTermComment.loanTermCommentID,
        loanTermComment.loanTermID,
        loanTermComment.userID,
        loanTermComment.bankID,
        loanTermComment.commentText
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanTermComment([
        loanTermComment.loanTermID,
        loanTermComment.userID,
        loanTermComment.bankID,
        loanTermComment.commentText
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanTermComment.update = (loanShare, cb) => {
    user.cc.invoke.updateLoanTermComment([
      loanTermComment.loanTermCommentID,
      loanTermComment.loanTermID,
      loanTermComment.userID,
      loanTermComment.bankID,
      loanTermComment.commentText
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanTermComment.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanTermComment', root: true}
  });

  LoanTermComment.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanTermComment.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanTermComment', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
