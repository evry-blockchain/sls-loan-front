var user;
import beforeRemote from '../utils/cc-before-remote-init';

module.exports = LoanReturn => {

  LoanReturn.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanReturn.getList = cb => {
      user.cc.query.getLoanReturnsList([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
      });
  };

  LoanReturn.count = cb => {
      user.cc.query.getLoanReturnsQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  LoanReturn.add = (loanReturn, cb)=> {
      user.cc.invoke.addLoanReturn([
        loanReturn.LoanID,
        loanReturn.Amount,
        loanReturn.ReturnDate,
      ], user.username, (err, data) => {
        cb(err, data);
    });
  };

  LoanReturn.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanReturn', root: true}
  });

  LoanReturn.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanReturn.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanReturn', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
