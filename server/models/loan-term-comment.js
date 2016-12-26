let user;
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
    user.cc.query.getLoanTermCommentList([], user.username, (err, data) => {
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
        loanTermComment.loanTermParentID,
        loanTermComment.loanTermID,
        loanTermComment.userID,
        loanTermComment.bankID,
        loanTermComment.commentText,
        new Date()
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanTermComment([
        loanTermComment.loanTermParentID,
        loanTermComment.loanTermID,
        loanTermComment.userID,
        loanTermComment.bankID,
        loanTermComment.commentText,
        new Date()
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanTermComment.update = (loanShare, cb) => {
    user.cc.invoke.updateLoanTermComment([
      loanTermComment.loanTermCommentID,
      loanTermComment.loanTermParentID,
      loanTermComment.loanTermID,
      loanTermComment.userID,
      loanTermComment.bankID,
      loanTermComment.commentText,
      new Date()
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanTermComment.commentsByProject = (projectID, cb) => {
    user.cc.query.getLoanTermList([], user.username, (err, terms) => {
      let projectTermIDs;
      try {
        projectTermIDs = JSON.parse(terms).filter(item => item.LoanRequestID == projectID).map(item => item.LoanTermID);
      } catch(e) {
        cb(err, []);
        return;
      }

      user.cc.query.getLoanTermCommentList([], user.username, (err, comments) => {
        let commentsParsed;

        try {
          commentsParsed = JSON.parse(comments);
        } catch(e) {
          commentsParsed = [];
        }
        cb(err, prepareListData(JSON.stringify(commentsParsed.filter(item => projectTermIDs.indexOf(item.LoanTermID) !== -1))));
      }, ['bankid']);
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

  LoanTermComment.remoteMethod('commentsByProject', {
    http: {
      path: '/commentsByProject/:projectID',
      verb: 'get'
    },
    accepts: {arg: 'projectID', type: 'string', required: true},
    returns: {type: 'LoanTermComment', root: true}
  });
};
