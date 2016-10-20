var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

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

  LoanReturn.getList = (filter, cb) => {
      user.cc.query.getLoanReturnsList([], user.username, (err, data) => {
        cb(err, prepareListData(data, filter));
      });
  };

  LoanReturn.count = cb => {
      user.cc.query.getLoanReturnsQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  LoanReturn.add = (loanReturn, cb)=> {
      user.cc.invoke.addLoanReturn([
        loanReturn.loanID,
        loanReturn.amount,
        loanReturn.returnDate,
      ], user.username, (err, data) => {
        cb(err, data);
    });
  };

  LoanReturn.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
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
